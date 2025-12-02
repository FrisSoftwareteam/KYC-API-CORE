/* eslint-disable @typescript-eslint/no-explicit-any */
import { asClass, asFunction, asValue, AwilixContainer } from 'awilix';
import path from 'path';
import * as R from 'ramda';
import { readdirSync } from 'fs';

/**
 * @typedef {function(): Promise<Error[]>} StopFunction
 */

export const isClass = (fn: () => void) => /^\s*class/.test(fn.toString());
export const isFunction = (v: () => void) => v.constructor === Function;

// decide what to register the value as to the awilix
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAwilixRegisterValue = (registerValue: any) => {
  if (isClass(registerValue)) return asClass(registerValue);
  if (isFunction(registerValue)) return asFunction(registerValue);
  return asValue(registerValue);
};

// get the file name from the given absolute/relative path
export const getFileName = (filePath: string) => path.basename(filePath, path.extname(filePath));
// make kebab case to camel case
export const kebabToCamel = (str: string) =>
  str.replace(/-([a-z])/gi, ($0, $1) => $1.toUpperCase());
// make the first char of the given string uppercase
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
// appends the first string to the one second one
export const appendString = R.curry((str) => R.flip(R.concat)(str));
// format name by capitalizing the file name
export const formatCapitalized = R.pipe(getFileName, capitalize);
// format name by capitalizing and appending string to the file name
export const formatCapitalizedWithAppend = (str: string) =>
  R.pipe(getFileName, kebabToCamel, capitalize, appendString(str));

/**
 * Require given directory and return the required ones
 * @param directoryPath
 * @returns {Function}
 */
export const requireDirectory = (directoryPath: string) =>
  // eslint-disable-next-line
  R.reduce(
    R.concat,
    [],
    R.map((f) => require(path.join(directoryPath, f)), readdirSync(directoryPath)),
  );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bindAndGetFunctions = (component: any) => {
  const { start, stop, register } = component;

  return {
    start: start ? start.bind(component) : undefined,
    stop: stop ? stop.bind(component) : undefined,
    register: register ? register.bind(component) : undefined,
  };
};

export const makeBootstrapComponent =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (componentFunc: any) => async (container: AwilixContainer) => {
    const scoped = container.createScope();
    scoped.register('component', asFunction(componentFunc));
    return scoped.resolve('component');
  };

// does nothing
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const asyncNoop = async (): Promise<void> => {};

/**
 * Given handles creates a single function that stops all components.
 * Resolves list of errors that happened when trying to stop components.
 * @param stopHandles
 * @returns {StopFunction}
 */

const createComponentStopFunction =
  (stopHandles: any, { logger }: any) =>
  () =>
    stopHandles.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (stopChain: any, { handle: stopHandle, key: component }: { handle: any; key: any }) =>
        stopChain
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((acc: any) => {
            logger.info(`stopping component ${component}`, { component });
            return Promise.resolve()
              .then(() => stopHandle())
              .then(() => {
                logger.info(`component ${component} stopped successfully`, { component });
                return acc;
              })
              .catch((err) => {
                logger.error('error happened when stopping component ', err);
                return [err, ...acc];
              });
          }),
      Promise.resolve([]),
    );

export { createComponentStopFunction };
/**
 * Given a container, and an object of components to resolve,
 * initialize each component with failure safe bootstrapping
 * then returns a new container and a stop function
 * @param container
 * @param bootstrap
 * @returns {Promise<StopFunction>}
 */

export const bootstrapWithContainer = async (
  container: AwilixContainer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bootstrap: any,
) => {
  const logger = container.resolve('logger');

  const componentsToBootstrap = Object.keys(bootstrap);

  // bootstrap each of the given component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { err, stopHandles }: { err: any; stopHandles: any } = await componentsToBootstrap.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (accPromise: any, component) => {
      const acc = await accPromise;
      // if there is any error, don't do further bootstrapping
      if (acc.err) return acc;
      const resolveFunc = bootstrap[component];

      try {
        // get start and stop handles
        const { start, stop, register } = bindAndGetFunctions(await resolveFunc(container));

        // start and get the resolved value for the component
        await (start || asyncNoop)();
        logger.info(`started component - ${component}`, { component });

        // register component to *real* container, if there is a value
        if (register && typeof register === 'function') {
          // for result
          container.register(component, getAwilixRegisterValue(register()));
        }

        return {
          // last one to initialize should be first to be stopped
          stopHandles: stop
            ? [{ handle: stop, key: component }, ...acc.stopHandles]
            : acc.stopHandles,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (errEx: any) {
        logger.error('Error registering', errEx);
        errEx.key = component;
        return { ...acc, err: errEx };
      }
    },
    { stopHandles: [] },
  );

  // if there were any errors whilst bootstrapping,
  if (err) {
    // stop the bootstrapped components,
    await createComponentStopFunction(stopHandles, { logger })();

    // and throw the error
    throw err;
  }

  return createComponentStopFunction(stopHandles, { logger });
};

import { create } from "zustand";

type Role = "admin" | "user" | null;
type Page = "users" | "login" | "profile" | "admin" | "forbidden";
type User = {
  email: string;
  name?: string;
  photo?: string;
  role?: string;
  department?: string;
};

interface DialogOnboardingProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: any;
  toggle: () => void;
  setData: (data: any) => void;
}

interface GetAllStates {
  states: any;
  isloading: boolean;
  error: any;
  fetchData: () => void;
}

interface GetAllLga {
  lgaData: any;
  isloadingLga: boolean;
  error: any;
  fetchDataLga: (id: any) => void;
}

interface GetFormId {
  formId: number;
  //isloadingFormState: boolean;
  error: any;
  getFormId: (id: number) => void;
}

interface FormState {
  formstate: boolean;
  isloadingFormState: boolean;
  error: any;
  updateFormState: () => void;
}

interface FlowState {
  flowstate: string;
  isloadingFlowState: boolean;
  error: any;
  createFlowState: () => void;
}

interface SwitchMode {
  isSwitch: boolean;
  switchState: (e: boolean) => void;
}

interface GetIdProps {
  loadings: boolean;
  qustionId: any;
  getAnsId: (id: any, user: any) => void;
  data: any;
  user: {};
}

interface ModelGetUserProfile {
  profile: User;
  isloading: boolean;
  error: any;
  page: Page;
  role: Role;
  getUserData: (data: any) => void;
}

interface ModelGetAnswer {
  answer: any;
  isloading: boolean;
  error: any;
  getAnswers: (data: any) => void;
}

interface ModelGetALLAnswer {
  answer: any;
  isloading: boolean;
  error: any;
  getAnswer: () => void;
}

interface ModelGetAnswers {
  answers: [];
  addOrUpdateAnswer: (newAnswer: any) => void;
  clearAnswers: () => void;
}

export const useGetAnswerId = create<GetIdProps>((set) => ({
  data: {},
  qustionId: 0,
  loadings: true,
  user: {},

  getAnsId: async (data, user) => {
    set({ data: data, qustionId: data });
    try {
      const getUserInfo: any = await fetch(`/api/get-users-detail/${user}`, {
        cache: "no-store",
      });

      // console.log(data);
      let { data: data2 } = await getUserInfo.json();

      console.log(data2, user);

      set({ loadings: false });

      set({ user: data2 });
    } catch (error) {}

    // }
  },
}));

// Holds a single answer payload provided by callers
export const useGetAnswer = create<ModelGetAnswer>((set) => ({
  answer: [],
  isloading: false,
  error: null,
  getAnswers: (data: any) => set({ answer: data }),
}));

// Fetches a collection of answers from an API endpoint
export const useGetAnswers = create<ModelGetALLAnswer>((set) => ({
  answer: [],
  isloading: false,
  error: null,
  getAnswer: async () => {
    set({ isloading: true });
    try {
      const res: any = await fetch(`/api/get-answers`, { cache: "no-store" });
      const json = await res.json();
      set({ answer: json?.data ?? [] });
    } catch (error) {
      set({ error });
    } finally {
      set({ isloading: false });
    }
  },
}));

export const useGetUserProfile = create<ModelGetUserProfile>((set) => ({
  profile: {
    email: "",
  },
  error: null,
  page: "login",
  role: null,
  isloading: false,
  getUserData: async (data: any) => {
    set({ isloading: true });
    try {
      set({
        profile: data,
        page: data.role === "admin" ? "admin" : "users",
        role: data.role,
      });
    } catch (error) {
      console.log(error);
      set({ error: error });
    } finally {
      set({ isloading: false });
    }
  },
}));

export const useAnswerStore = create<ModelGetAnswers>((set) => ({
  // STATE: Initialize with an empty array of answers
  answers: [],

  // ACTION: This function handles adding a new answer or updating an existing one.
  addOrUpdateAnswer: (newAnswer: any) =>
    set((state: any) => {
      // Check if an answer with the same ID already exists in the array
      const existingAnswerIndex = state.answers.findIndex(
        (answer: any) => answer.id === newAnswer.id
      );

      // If an answer with the same ID is found (index is not -1)
      if (existingAnswerIndex !== -1) {
        // Create a new array by mapping over the old one
        const updatedAnswers = state.answers.map((answer: any, index: any) => {
          // If it's the item we want to update, return the new answer object
          if (index === existingAnswerIndex) {
            return newAnswer;
          }
          // Otherwise, return the original item
          return answer;
        });

        // Return the new state with the updated array
        console.log("Updated Answers:", updatedAnswers);
        return { answers: updatedAnswers };
      } else {
        // If no answer with the same ID exists, just add the new one to the end
        console.log("Added New Answer:", newAnswer);
        console.log("Current Answers:", state.answers);
        return { answers: [...state.answers, newAnswer] };
      }
    }),

  // ACTION (Optional): A simple action to clear all answers
  clearAnswers: () => set({ answers: [] }),
}));

export const useDialogOnboarding = create<DialogOnboardingProps>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: false }),

  data: {},
  setData: (data) => set({ data: { data } }),
}));

export const useFetchState = create<GetAllStates>((set) => ({
  states: [],
  error: null,
  isloading: false,
  fetchData: async () => {
    set({ isloading: true });

    try {
      const getAllStates: any = await fetch("/api/getstates", {
        cache: "no-store",
      });

      let { data } = await getAllStates.json();

      // console.log("Scanned", data);

      set({ states: data });
    } catch (error) {
      console.log(error);
      set({ error: error });
    } finally {
      set({ isloading: false });
    }
  },
}));

export const useSwitchMode = create<SwitchMode>((set) => ({
  isSwitch: false,
  switchState: async (e) => set({ isSwitch: e }),
}));

export const useFetchLga = create<GetAllLga>((set) => ({
  lgaData: [],
  error: null,
  isloadingLga: false,
  fetchDataLga: async (id: any) => {
    set({ isloadingLga: true });

    // console.log(id);

    try {
      const getAllLga: any = await fetch(`/api/getlga/${id}`, {
        cache: "no-store",
      });

      let { data } = await getAllLga.json();

      console.log("Scanned", data);

      set({ lgaData: data });
    } catch (error) {
      console.log(error);
      set({ error: error });
    } finally {
      set({ isloadingLga: false });
    }
  },
}));

export const useFormState = create<FormState>((set) => ({
  formstate: false,
  error: null,
  isloadingFormState: false,
  updateFormState: async () => {
    set({ isloadingFormState: true });

    // console.log(id);

    try {
      // const getAllLga: any = await fetch(`/api/getlga/${id}`, {
      //   cache: "no-store",
      // });

      // let { data } = await getAllLga.json();

      // console.log("Scanned", data);

      set({ formstate: true });
    } catch (error) {
      console.log(error);
      set({ error: error });
    } finally {
      set({ isloadingFormState: false });
    }
  },
}));

export const useFormId = create<GetFormId>((set) => ({
  formId: 0,
  error: null,
  //isloadingFormState: false,
  getFormId: async (id: number) => {
    //set({ isloadingFormState: true });

    try {
      set({ formId: id });
    } catch (error) {
      console.log(error);
      set({ error: error });
    } finally {
      // set({ isloadingFormState: false });
    }
  },
}));

// export const useFlow = create<GetFormId>((set) => ({
//   flowstate: "",
//   error: null,
//   //isloadingFormState: false,
//   createFlowState: async (id: number) => {
//     //set({ isloadingFormState: true });

//     try {
//       set({ flowstate: id });
//     } catch (error) {
//       console.log(error);
//       set({ error: error });
//     } finally {
//       // set({ isloadingFormState: false });
//     }
//   },
// }));

export const verificationTypes = [
  'Identity verification',
  'Address verification',
  'Employment verification',
  'Property verification',
  'Certificate verification',
  'ID verification',
];
export const VerificationTypeOptions = verificationTypes.map((item) => ({
  label: item,
  value: item.split(' ')[0].toLowerCase(),
}));

export const IdTypes = [
  'NIN',
  'Voters card',
  'Birth certificate',
  "Driver's Licence",
];

export const IdTypeoptions = IdTypes.map((item) => ({
  label: item,
  value: item.toLowerCase(),
}));

export const categoryOptions = [
  { label: 'Business', value: 'business' },
  { label: 'Individual', value: 'individual' },
];

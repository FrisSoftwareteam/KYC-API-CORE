import { CircleDotIcon, TextIcon, TypeIcon } from "lucide-react";

import { FieldType, type FormField } from "@/types/field";

export const fields: FormField[] = [
  {
    type: FieldType.INPUT,
    name: "Input",
    label: "Your short question",
    placeholder: "pls. provide the response",
    description: "",
    Icon: TypeIcon,
    default: "",
    divisionalInput: "",
    groupHeadInput: "",
    comments: "",
    hodInput: "",
    commentsDivisional: "",
    commentsGroupHead: "",
    appraisalComment: "",
  },
  {
    type: FieldType.TEXTAREA,
    name: "Textarea",
    label: "Your long questions response/list of response",
    placeholder: "",
    description: "Kindly provide the response",
    Icon: TextIcon,
    default: "",
    divisionalInput: "",
    hodInput: "",
    groupHeadInput: "",
    commentsDivisional: "",
    commentsGroupHead: "",
    appraisalComment: "",
  },
];

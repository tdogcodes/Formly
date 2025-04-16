import { FormWithSettings } from "@/@types/form.type";
import { createContext } from "react";

type BuilderContexType = {
    loading: boolean;
    formData: FormWithSettings
}
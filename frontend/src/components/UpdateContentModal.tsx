import { X, Send, BrainCogIcon } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { contentformField } from "../types/formTypes";
import { UpdateContent } from "../api/content";
import { defaultInputStyle } from "../pages/Signin";
import { useQueryClient } from "@tanstack/react-query";


export interface ModalBehave extends contentformField {
    open: boolean;
    close: () => void;
    id?:string
    setcontextOpen?: () => void;
   
}

export function UpdateContentModal(props: ModalBehave) {
    if (!props.open) return null;
    const { register, handleSubmit, watch , setValue} = useForm<contentformField>({
        defaultValues: {
            isPublic: true
        }
    })

    const isPublic = watch("isPublic")


    const handleToggle = () => {
        setValue("isPublic", !isPublic)
    }

    

    // To trigger it:
    // mutation.mutate({ id: '123', data: myFormData });
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => UpdateContent(id, data),
        onSuccess: () => {
           props.setcontextOpen &&  props?.setcontextOpen()
            props.close();
            queryClient.invalidateQueries(["content"]);
        }
    });

    const onSubmit = (data: contentformField) => {
        const formattedData = {
            ...data,
            tags: data.tags
        }
       // Pass everything as one object to match the mutationFn above
        mutation.mutate({ id: String(props.id), data: formattedData });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={props.close}
            />

            <div className="relative bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl transform transition-all animate-in fade-in zoom-in duration-200">

                <div className="flex justify-between items-center mb-6">
                    <div className="flex  items-center gap-2 font-bold">
                        <BrainCogIcon color="gray" size={18} />
                        <h2 className="text-xl font-bold text-gray-500">{"Update your brain"}</h2>
                    </div>
                    <div
                        className="p-1 hover:bg-gray-100 rounded-full cursor-pointer text-gray-500 transition-colors"
                        onClick={props.close}
                    >
                        <X size={20} />
                    </div>
                </div>

                {/* Form Body */}
                <div className="space-y-6">
                    <form  onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col w-full gap-4">

                        <div className="flex flex-col gap-1">
                            <label className="text-[1rem] font-semibold text-gray-500 ml-1">Title</label>
                            <Input value={props.title}  register={register("title",{required: true}) }
                            style={defaultInputStyle} type="text" placeholder="Keep it catchy..." />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[1rem] font-semibold text-gray-500 ml-1">Content/Link</label>
                            <Input value={props.content} register={register("content", {required:true})} style={defaultInputStyle} type="text" placeholder="Paste a link or any text related stuff.." />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[1rem] font-semibold text-gray-500 ml-1">Tags</label>
                            <Input value={props.tags} register={register("tags", {required: false})} style={defaultInputStyle} type="text" placeholder="Tags that best describe your content.. (optional)" />
                        </div>

                        <div className="flex gap-5 mt-3">
                            <label  className="text-[1rem] font-semibold text-gray-500 ml-1">{  isPublic ? "Public" : "Private"}</label>
                            <div
                                onClick={handleToggle}
                                className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${ isPublic ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${ isPublic ? 'translate-x-7' : 'translate-x-0'
                                        }`}
                                />
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-center mt-8">
                        <Button
                            loading={mutation.isPending}
                            type="submit"
                            startIcon={<Send size={18} />}
                            text={"Update Brain"}
                            variant="primary"
                        />
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
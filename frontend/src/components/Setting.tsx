
import { Settings, X, LogOutIcon, UserMinus2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "./Button";
import type { SettingOptions } from "../types/formTypes";
import { settingUpdate } from "../api/link";
import { Logout } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { shareLink } from "../api/link";

function Setting(props: SettingOptions) {
    if (!props.open) return null
    const navigate = useNavigate()
    const { watch, setValue } = useForm<SettingOptions>({
        defaultValues: {
            deleteLinks: false,
            deactivateAccount: false,
            deleteAccount: false,
            language: "en",
            grantPersonalData: true,
        }
    })

    const grantPersonalData = watch("grantPersonalData")
    const deleteLinks = watch("deleteLinks")

    const handleToggle = (value: any, action: any) => { setValue(value, !action) }

    const settingMutation = useMutation({
        mutationFn: (data: any) => {
            return settingUpdate(data)
        }
    })

    const logoutMutation = useMutation({
        mutationFn: () => Logout(),
        onSuccess: () => {
            navigate("/login")
        }
    });

    const DelMutation = useMutation({
        mutationFn: (isDel: boolean) => shareLink(isDel),
    });



    const logoutOperate = () => {
        logoutMutation.mutate()
    }
    const settingOperate = (data: SettingOptions) => {
        settingMutation.mutate(data)
    }

    const DelOperate = () => {
        DelMutation.mutate(false)
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    onClick={props.close}
                />

                <div className="relative bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl transform transition-all animate-in fade-in zoom-in duration-200">

                    <div className="flex justify-between items-center mb-6">
                        <div className="flex  items-center gap-2 font-bold">
                            <Settings color="gray" size={18} />
                            <h2 className="text-xl font-bold text-gray-500">{"Settings"}</h2>
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
                        <form >
                            <div className="flex flex-col w-full gap-10">
                            </div>
                            <div className="flex gap-5 mt-3 items-center justify-between" title="we collect data for user experience only">
                                <label className="text-[1rem] font-semibold text-gray-500 ml-1">Share link</label>
                                <div
                                    onClick={() => {
                                        handleToggle("deleteLinks", deleteLinks);
                                        settingOperate({ deleteLinks: deleteLinks })
                                        DelOperate()
                                    }}
                                    className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${!deleteLinks ? 'bg-blue-500' : 'bg-gray-300'
                                        }`}
                                >
                                    <div
                                        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${!deleteLinks ? 'translate-x-7' : 'translate-x-0'
                                            }`}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-5 mt-3 items-center justify-between" title="we collect data for user experience only">
                                <label className="text-[1rem] font-semibold text-gray-500 ml-1">Grant Data Access</label>
                                <div
                                    onClick={() => {
                                        handleToggle("grantPersonalData", grantPersonalData);
                                        settingOperate({ grantPersonalData: grantPersonalData });
                                    }}

                                    className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${!grantPersonalData ? 'bg-blue-500' : 'bg-gray-300'
                                        }`}
                                >
                                    <div
                                        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${!grantPersonalData ? 'translate-x-7' : 'translate-x-0'
                                            }`}
                                    />
                                </div>
                            </div>

                        </form>
                        <div className="flex items-center justify-between mt-8">
                            <Button
                                onClick={() => logoutOperate()}
                                startIcon={<LogOutIcon size={18} />}
                                text={"Logout"}
                                variant="secondary"
                            />
                            <Button
                                onClick={() => {
                                    settingOperate({ deactivateAccount: true })
                                    navigate("/login")
                                }}
                                startIcon={<UserMinus2Icon size={18} />}
                                loading={settingMutation.isPending}
                                text={"Deactivate Account"}
                                variant="secondary"
                                style="hover:bg-red-500  hover:text-white"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}



export default Setting

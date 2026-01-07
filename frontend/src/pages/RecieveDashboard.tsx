import { Card } from "../components/Card";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { sendLink } from "../api/link";
import { BrainCogIcon, Loader2Icon, UserCircle2Icon } from "lucide-react";
import { Button } from "../components/Button";

function RecieveDashboard() {
    const { brainId } = useParams<{ brainId: string }>();
    if (!brainId) return null;

    const getData = async () => {
        const response = await sendLink(brainId.toString());
        return response;
    };

    const { data, isPending } = useQuery({
        queryKey: ["getContent"],
        queryFn: getData
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col gap-4 mb-8">
                    <div className="flex items-center gap-2 text-gray-500">
                        <BrainCogIcon size={18} className="text-indigo-500" />
                        <span className="text-sm font-semibold tracking-wide uppercase">Brain Owner</span>
                    </div>
                    
                    <div className="flex items-center">
                        <Button 
                            text={isPending ? <Loader2Icon className="animate-spin" size={18}/> : data?.details?.details?.username}
                            variant="secondary"
                            startIcon={<UserCircle2Icon size={18}/>} 
                        />
                    </div>
                </div>

                <hr className="border-gray-200 mb-10" />

                <div>
                    {data?.details?.details?.data?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {data?.details?.details?.data?.map((item: any) => (
                                <Card 
                                    key={item.id}
                                    title={item.title}
                                    content={item.content}
                                    type={item.type}
                                    tags={item.tags}
                                    createdAt={new Date(item.createdAt).toDateString()}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
                            <p className="text-xl font-medium text-gray-400">No content yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RecieveDashboard;
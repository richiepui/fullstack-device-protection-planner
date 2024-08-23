import AuthLayout from "@/components/AuthLayout";
import DeviceManager from "@/components/Device/DeviceManager";
import DeviceLayout from "@/components/Layouts/DeviceLayout";
import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/hook";



export default function Device() {

    const username = useAppSelector((state: RootState) => state.auth.username) || ""

    return(
        <AuthLayout>
            <DeviceLayout username={username}>
                <DeviceManager />
            </DeviceLayout>
        </AuthLayout> 
    )
}
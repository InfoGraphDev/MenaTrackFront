import { MainReducerStateInterface } from "@/Context/Redux/Reducer/MainReducer";
import { OverLayReducerInterface } from "@/Context/Redux/Reducer/overlayReducer";

export interface ReduxInterface{
    OverLayReducer:OverLayReducerInterface;
    MainReducerApp:MainReducerStateInterface;
}
import { TRoute, TUserPath } from "@/types"


export const routerGenerator=(Items:TUserPath[])=>{
    const router=Items.reduce((acc:TRoute[],item)=>{
        if(item.path || item.index){
            acc.push({
                path:item.path!,
                element:item.element
            })
        }
        return acc
    },[])
    return router
}
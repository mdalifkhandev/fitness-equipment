/* eslint-disable @typescript-eslint/no-explicit-any */
import {Input } from "antd"


const PriceRange=({setMinPrice,setMixPrice}:any)=>{
   const onFinish = (event: any) => {
    event.preventDefault()
    const mix=(event.target.mix.value);
    const min=(event.target.min.value);
    setMinPrice(min)
    setMixPrice(mix)
  };
  
   return (
       <div>
            <form 
      onSubmit={onFinish} className="flex items-center gap-2 w-64" >
        <p>Price:</p>
                <Input name="min" placeholder="Min Price"/>
                <Input name="mix" placeholder="Mix Price"/>
                <Input type="submit" value='Submit'/>
            </form>
       </div>
   )
}

export default PriceRange
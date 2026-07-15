"use client";
import { ReactNode } from "react";
import { Receipt, X, Check } from "lucide-react";
import { C } from "@/lib/constants";

export const Card = ({children,style,className}:{children:ReactNode;style?:any;className?:string}) =>
  <div className={className} style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:20,...style}}>{children}</div>;

export const Progress = ({value,max,color=C.green,h=5}:{value:number;max:number;color?:string;h?:number}) =>
  <div style={{width:"100%",height:h,background:"#1e1e1e",borderRadius:h,overflow:"hidden"}}>
    <div style={{width:`${max>0?Math.min((value/max)*100,100):0}%`,height:"100%",background:color,borderRadius:h,transition:"width 0.8s cubic-bezier(.4,0,.2,1)"}}/>
  </div>;

export const Tag = ({children,color=C.sub}:{children:ReactNode;color?:string}) =>
  <span style={{fontSize:9,fontWeight:600,color,background:`${color}12`,padding:"3px 7px",borderRadius:5}}>{children}</span>;

export const Empty = ({text,action}:{text:string;action?:ReactNode}) =>
  <div style={{textAlign:"center",padding:"56px 20px"}}>
    <div style={{width:52,height:52,borderRadius:14,background:"#1a1a1a",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}><Receipt size={22} color={C.dim}/></div>
    <p style={{fontSize:14,color:"#555",margin:"0 0 6px",fontWeight:500}}>{text}</p>
    <p style={{fontSize:12,color:"#3a3a3a",margin:"0 0 16px"}}>Comece adicionando seus dados financeiros</p>
    {action}
  </div>;

export const Btn = ({children,onClick,primary,small,style:s}:{children:ReactNode;onClick?:()=>void;primary?:boolean;small?:boolean;style?:any}) =>
  <button onClick={onClick} style={{padding:small?"7px 12px":"10px 18px",borderRadius:small?8:10,border:primary?"none":`1px solid ${C.border}`,background:primary?C.accent:"transparent",color:primary?"#000":C.sub,fontSize:small?11:12,fontWeight:primary?600:500,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:5,transition:"all 0.2s",...s}}>{children}</button>;

export const CurrencyInput = ({value,onChange,large}:{value:number;onChange:(v:number)=>void;large?:boolean}) => {
  const h=(e:any)=>{let r=e.target.value.replace(/\D/g,"");if(!r){onChange(0);return}onChange(parseInt(r,10)/100)};
  const d=value?`R$ ${value.toLocaleString("pt-BR",{minimumFractionDigits:2})}`:"";
  return <input value={d} onChange={h} placeholder="R$ 0,00" style={{width:"100%",padding:large?"12px 14px":"10px 12px",borderRadius:10,background:C.input,border:`1px solid ${C.border}`,color:C.text,fontSize:large?16:14,fontWeight:600,outline:"none",fontVariantNumeric:"tabular-nums"}}/>;
};

export const DateInput = ({day,month,onDayChange:od,onMonthChange:om}:any) =>
  <div style={{display:"flex",alignItems:"center",gap:4}}>
    <input value={day} onChange={(e:any)=>od(e.target.value.replace(/\D/g,"").slice(0,2))} placeholder="DD" maxLength={2} style={{width:50,padding:"10px 8px",borderRadius:10,background:C.input,border:`1px solid ${C.border}`,color:C.text,fontSize:14,fontWeight:600,outline:"none",textAlign:"center"}}/>
    <span style={{color:C.dim,fontSize:18,fontWeight:700}}>/</span>
    <input value={month} onChange={(e:any)=>om(e.target.value.replace(/\D/g,"").slice(0,2))} placeholder="MM" maxLength={2} style={{width:50,padding:"10px 8px",borderRadius:10,background:C.input,border:`1px solid ${C.border}`,color:C.text,fontSize:14,fontWeight:600,outline:"none",textAlign:"center"}}/>
  </div>;

export const Select = ({value,onChange,options}:{value:string;onChange:(v:string)=>void;options:{value:string;label:string}[]}) =>
  <select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",padding:"10px 12px",borderRadius:10,background:C.input,border:`1px solid ${C.border}`,color:C.text,fontSize:12,outline:"none",appearance:"none" as any}}>{options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select>;

export const TextInput = ({value,onChange,placeholder,type="text"}:any) =>
  <input type={type} value={value} onChange={(e:any)=>onChange(e.target.value)} placeholder={placeholder} style={{width:"100%",padding:"10px 12px",borderRadius:10,background:C.input,border:`1px solid ${C.border}`,color:C.text,fontSize:13,outline:"none"}}/>;

export const Label = ({children}:{children:ReactNode}) =>
  <label style={{fontSize:11,color:C.dim,marginBottom:5,display:"block",fontWeight:500}}>{children}</label>;

export const Modal = ({open,onClose,title,children}:{open:boolean;onClose:()=>void;title:string;children:ReactNode}) => {
  if(!open) return null;
  return <><div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:300,backdropFilter:"blur(6px)"}}/><div className="fade-in" style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"100%",maxWidth:420,maxHeight:"85vh",overflowY:"auto",background:C.card,border:`1px solid ${C.border}`,borderRadius:20,padding:26,zIndex:301}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}><span style={{fontSize:16,fontWeight:600,color:C.text}}>{title}</span><div onClick={onClose} style={{width:30,height:30,borderRadius:8,background:C.card2,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><X size={14} color={C.sub}/></div></div>{children}</div></>;
};

export const Checkbox = ({checked,onChange,label,color=C.green}:{checked:boolean;onChange:()=>void;label?:string;color?:string}) =>
  <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={onChange}>
    <div style={{width:20,height:20,borderRadius:6,border:`1.5px solid ${checked?color:C.border}`,background:checked?`${color}18`:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>{checked&&<Check size={12} color={color}/>}</div>
    {label&&<span style={{fontSize:12,color:C.sub}}>{label}</span>}
  </div>;

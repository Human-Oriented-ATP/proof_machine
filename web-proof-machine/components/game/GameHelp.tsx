import { Crosshair1Icon } from "@radix-ui/react-icons"
import { Connector } from "./gadget/Connector"

function HelpSection(props : { title: string, children: React.ReactNode }) { 
    return <li className="pt-3 first:pt-0">
        <h3 className="font-bold leading-normal">{props.title}</h3>
        <ul>
            {props.children} 
        </ul>
    </li>
}

function HelpItem(props: { children: React.ReactNode } ) { 
    return <li className="leading-relaxed">{props.children}</li>
}

function DeleteKeyIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
        className="w-[19px] h-[19px] inline-block align-text-bottom">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
    </svg>
}

function SourceConnector() { 
    return <div className="inline-block scale-75"><Connector type="source" isInline={true} /></div>
}

function TargetConnector() {
    return <div className="inline-block scale-75"><Connector type="target" isInline={true} /></div>
}

function OpenTargetConnector() {
    return <div className="inline-block scale-75"><Connector type="target" isInline={true} isOpen={true} /></div>
}

function BrokenConnection() { 
    const pathStyle = {
        strokeDasharray: '5',
        animation: 'dashdraw 0.5s linear infinite',
      };
      
    return <div className="align-text-bottom inline-block scale-75 w-[87px] translate-x-[-5px]">
        <svg width="60px" height="20px" className="absolute inline bottom-[0px] left-[17px] z-0">
            <path 
                d="m 1.8504024,6.2598265 h 1 c 4,0 12.0000006,-7.00000402 24.0000006,0 12,6.9999995 21.000005,0 24.000005,0 h 1"
                className="stroke-black stroke-linecap-square stroke-2 fill-none" style={pathStyle}/>
        </svg>
        <div className="absolute bottom-0 left-0">
            <Connector type="source" isInline={true} isBroken={true} />
        </div>
        <div className="absolute bottom-0 left-[60px]">
            <Connector type="target" isInline={true} isBroken={true} />
        </div>
    </div>
}

export function GameHelp() {
    return <>
        <h2 className="text-xl font-bold">Game Help</h2>
        <ul className="text-left leading-10 p-5">
            <HelpSection title="Connections">
                <HelpItem>Connect all open connectors<OpenTargetConnector />to complete the gadget machine</HelpItem>
                <HelpItem>The machine is only complete if there are no broken <span className="break-keep">connections<BrokenConnection /></span></HelpItem>
                <HelpItem>Draw a line from<SourceConnector />to<TargetConnector />to create a connection</HelpItem>
                <HelpItem>Click on<TargetConnector />to remove a connection</HelpItem>
            </HelpSection>

            <HelpSection title="Gadgets">
                <HelpItem>Drag gadgets from the gadget shelf to use them in the machine</HelpItem>
                <HelpItem>Press shift to select multiple gadgets</HelpItem>
                <HelpItem>Press backspace <DeleteKeyIcon /> to remove selected gadgets</HelpItem>
                <HelpItem>You can also drag gadgets over the gadget shelf to remove them</HelpItem>
            </HelpSection>
            
            <HelpSection title="Navigation">
                <HelpItem>Click on the crosshair <Crosshair1Icon className="inline w-[19px] h-[19px] align-text-bottom"/> to centre your gadget machine</HelpItem>
                <HelpItem>Click on the canvas to deselect all gadgets</HelpItem>
            </HelpSection>
        </ul>
    </>
}
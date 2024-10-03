import { MenuButtons } from './MenuButtons';
import { ExclamationTriangleIcon, StarIcon } from '@radix-ui/react-icons';
import { Connector } from 'components/game/gadget/Connector';
import { StudyConfiguration } from 'lib/study/Types';

interface MenuBarProps {
    levelIsCompleted: boolean
    diagramHasBrokenConnection: boolean
    showHelpWindow: () => void
    configuration: StudyConfiguration
}

const LEVEL_COMPLETED_MESSAGE = <>
    <StarIcon className='w-8 h-8 inline-block mr-2'/>
    Level completed!
    <StarIcon className='w-8 h-8 inline-block ml-2'/>
    </>
const BROKEN_CONNECTION_MESSAGE = <>
    <ExclamationTriangleIcon className='w-8 h-8 inline-block mr-2'/>
    Broken connection! Click the connector
    <span className="inline-block mx-0.5 align-text-bottom"><Connector type={'target'} isInline={true} isBroken={true} /></span> 
    below to remove 
    </>
const EMPTY_MESSAGE = <></> 

export default function MenuBar(props: MenuBarProps) {

    const message = props.levelIsCompleted ? LEVEL_COMPLETED_MESSAGE : 
                    props.diagramHasBrokenConnection ? BROKEN_CONNECTION_MESSAGE : EMPTY_MESSAGE

    return <div className="flex items-center justify-center z-10">
        <div className="flex items-center bg-white p-1 shadow-lg w-full text-left">
            <div className='grow m-1 text-center text-xl'>
                {message}
            </div>
            <MenuButtons levelCompleted={props.levelIsCompleted} showHelpWindow={props.showHelpWindow} configuration={props.configuration} />
        </div>
    </div>
};

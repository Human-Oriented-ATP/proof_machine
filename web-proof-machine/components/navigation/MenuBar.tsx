import { StatusBarState } from 'components/game/GameScreen';
import { MenuButtons } from './MenuButtons';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Connector } from 'components/game/gadget/Connector';

interface LevelCompletedBannerProps {
    statusBarState: StatusBarState
    showHelpWindow: () => void
}

const LEVEL_COMPLETED_MESSAGE = <>Level completed!</>
const BROKEN_CONNECTION_MESSAGE = <span className='text-center'>
    <ExclamationTriangleIcon className='w-8 h-8 inline-block mr-2'/>
    Broken connection! Click 
    <span className="inline-block mx-0.5"><Connector type={'target'} isInline={true} isBroken={true} /></span> 
    to remove 
    </span>
const EMPTY_MESSAGE = <></> 

export default function MenuBar(props: LevelCompletedBannerProps) {

    const message = props.statusBarState.levelIsCompleted ? LEVEL_COMPLETED_MESSAGE : 
                    props.statusBarState.diagramHasBrokenConnection ? BROKEN_CONNECTION_MESSAGE : EMPTY_MESSAGE

    return <div className="flex items-center justify-center z-10">
        <div className="flex items-center bg-white p-1 shadow-lg w-full text-left">
            <div className='grow m-1 text-center text-xl'>
                {message}
            </div>
            <MenuButtons levelCompleted={props.statusBarState.levelIsCompleted} showHelpWindow={props.showHelpWindow} />
        </div>
    </div>
};

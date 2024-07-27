import { LevelCompletedButtons } from './LevelCompletedButtons';

interface LevelCompletedBannerProps {
    isSolved: boolean;
}

export default function LevelCompletedBanner(props: LevelCompletedBannerProps) {
    const message = props.isSolved ? "Level completed!" : "";

    return <div className="flex items-center justify-center z-10">
        <div className="flex items-center bg-white p-1 shadow-lg w-full text-left">
            <div className='grow m-1'>
                <h2 className='text-xl'>{message}</h2>
            </div>
            <LevelCompletedButtons levelCompleted={props.isSolved} />
        </div>
    </div>
};

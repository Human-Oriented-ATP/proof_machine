import { StartButton } from "components/primitive/buttons/StartFirstUnsolvedLevel"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

function Heading(props) {
    return <div className="text-xl pb-4">{props.children}</div>
}

function Section(props) {
    return <div className={twMerge("max-w-screen-lg p-4", props.className)}>{props.children}</div>
}

export function LandingPage() {
    return (
        <div className="w-screen flex flex-col items-center text-center pt-10">
            <Section>
                <h1 className="text-2xl p-4">The Gadget Game Study</h1>
                <p><i>This survey has been approved by the University of Cambridge Dept of Computer Science Ethics Committee</i></p>
            </Section>
            <Section className="bg-white">
                <Heading>Welcome!</Heading>

                <p>In this study, you will be playing an online puzzle: the Gadget Game. The goal of this research is to understand better how humans perform at solving tricky puzzle problems.</p>
            </Section>
            <Section>
                <Heading>Age restriction</Heading>
                You must be 18 years old or above to participate in the study.
            </Section>
            <Section>
                <Heading>Privacy and Data Usage</Heading>
                <p className="p-2">We very much value your privacy! We  will not save any identifying information, beyond your self-reported level of education and mathematical expertise and how you play the game (to help us ground the evaluations).</p>

                <p className="p-2">Please note that your interactions with the game will be saved. Please do not participate if you are not comfortable with those data sharing procedures.</p>

                <p className="p-2">Your participation in this research is voluntary. You may discontinue participation at any time during the survey.</p>

                <p className="p-2">
                    <b>Please only proceed to the study if you are comfortable with the above,<br /> and acknowledge that you wish to participate in this research.</b>
                </p>
            </Section>
            <div className="p-4">
                <Link href={`pilot3/game/tutorial01`}>
                    <StartButton />
                </Link>
            </div>
            <div className="fixed bottom-0 right-0 p-2 text-sm">Contact: jcb234@cam.ac.uk </div>
        </div>
    )
}
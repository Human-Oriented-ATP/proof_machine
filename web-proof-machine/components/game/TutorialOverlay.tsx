import { DummyHandle } from "components/primitive/DummyHandle"

const tutorialTexts: Map<string, JSX.Element> = new Map([
    ["tutorial01",
        <>
            The goal in this game is to build diagrams from gadgets. <br />
            Start by dragging the gadget from the left into the diagram. <br />
            Then connect the two gadgets by drawing a line from <span><DummyHandle position="inline" /></span> to <span><DummyHandle position="inline" /></span>.
        </>
    ],
    ["tutorial02",
        <>
            You can create connections between cells only if they have the same color. <br />
            Try drawing a line from a blue cell to a red cell and see what happens. <br />
        </>
    ],
    ["tutorial03",
        <>
            If you move two gadgets close to each other they connect automatically. <br />
            You'll know when they are close enough because <span><DummyHandle position="inline" /></span> and <span><DummyHandle position="inline" /></span> will turn red. Try it! <br />
        </>
    ],
    ["tutorial04",
        <>
            You will have noticed in the previous level that some of the circles contained numbers. <br />
            The most important rule of the game is that these numbers must match.<br />
            Try joining the gadget with the blue output cell to the blue "goal". You will see that the empty<br />
            circles automatically fill with numbers in order for a match to occur. Now try joining one of the<br />
            two small red "input" gadgets to the wrong numbered circle. Because the numbers don't match,<br />
            the connection will break and the handles will become grey <span><DummyHandle position="inline" isBrokenConnection={true} /></span>. <br />
            You can always remove a connection (whether it matches or not) by clicking on the handle <span><DummyHandle position="inline" isBrokenConnection={true} /></span> or <span>
                <DummyHandle position="inline" /></span>. <br />
        </>
    ],
    ["jacob_easy01",
        <>
            To summarize, gadgets should be connected only when the colours and numbers line up. <br />
            Have another try at connecting the wrong gadgets before you connect the right one.<br />
        </>
    ],
    ["jacob_easy02",
        <>
            The ordering of the numbers matters as well. Can you solve this problem?<br />
            (A problem is considered solved when there are no longer any unattached handles.)<br />
        </>
    ],
    ["tutorial05",
        <>
            Pink nodes acquire a value that depends on the remaining numbers in the cell. <br />
            Until they are connected to other gadgets with numbers, their value is undetermined.
        </>
    ],
    ["tutorial06",
        <>
            Pink nodes always take the same value with the same inputs.
        </>
    ],
    ["jacob_easy03",
        <>
            Be careful, pink nodes will take different values when the other numbers are different.
        </>
    ]
])

export default function TutorialOverlay({ problemId }: { problemId: string }) {
    if (tutorialTexts.has(problemId)) {
        return <div className="fixed w-full h-full">
            <div className="absolute left-40 top-12">
                {tutorialTexts.get(problemId)}
            </div>
        </div>
    } else {
        return <></>
    }
}

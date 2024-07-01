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
            Some of the circles here contain numbers. Notice what happens when you connect <br />
            a gadget with empty circles to one with numbers in the circles.<br />
        </>
    ],
    ["tutorial04",
        <>
            The most important rule of the game is that any numbers in connected cells must match.<br />
            While you solve this level, try matching one of the two small red "input" gadgets to the <br />
            wrong numbered. The connection will break and you will see a grey handle <span><DummyHandle position="inline" isBrokenConnection={true} /></span>. <br />
            You can always remove a connection (whether broken or not) by clicking on the handle <span><DummyHandle position="inline" isBrokenConnection={true} /></span> or <span>
                <DummyHandle position="inline" /></span> at the end of it. <br />
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
            Pink nodes take the same value when the other numbers in the cell are the same.<br />
            Can you see how to solve this problem? Notice what happens when<br />
            you attach the gadget with a pink node for the second time.<br />
            Also, try matching the pink node with the number 1: you will get <br />
            a broken connection.<br />
        </>
    ],
    ["jacob_easy03",
        <>
            If the other numbers in the cell are not the same, then pink nodes must take different values.<br />
            See what happens here if you try to solve the problem without using the middle gadget,<br />
            and then what happens if you do use the middle gadget.<br />
        </>
    ],
    ["tim_easy11",
        <>
            If you create a new number using a pink node and match that number to another pink node,<br />
            then any empty circles in the cells will be filled automatically if that is necessary to make the numbers consistent<br />
            for the two occurrences of the pink nodes. (If this is not possible, you will get a broken connection.)<br />
        </>
     ],
     ["tim_easy12",
        <>   
            This problem is slightly harder. While you're solving it, try scrolling with two fingers on your trackpad. You <br />
            should find that the entire picture enlarges or contracts (depending on the direction you scroll in). Another useful <br />
            facility when the problems get bigger and more elaborate is that you can drag the entire picture -- just press and <br />
            hold the trackpad and then move. If part of the diagram disappears off the edge of the screen, don't worry: it's still <br />
            there and you can drag it back again! If you click or tap on a gadget, you select it, and it will be highlighted. If <br />
            you now press the delete key, it will be deleted. If you hold down the shift key, you can select multiple gadgets as <br />
            though you were preparing a screenshot. Take care when doing this to let go of the trackpad before you let up the shift key.<br />
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

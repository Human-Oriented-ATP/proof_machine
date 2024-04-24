'use client'

import React from 'react'
import ProblemSelector from '../ui/ProblemSelector'

export function ClientOnly(props) {
    return <ProblemSelector problems={props.problems} />
}
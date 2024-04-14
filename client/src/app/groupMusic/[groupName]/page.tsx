"use client"
import React from 'react'
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMode } from '@/store/slices/applicationState';

export default function GroupMusic({ params }: { params: { groupName: string } }) {
    const colorMode = useSelector((state: RootState) => state.applicationState.theme);
    return <div>My Post: {params.groupName} {colorMode}</div>
}
import React, { useContext } from 'react';
import { Statistic } from 'antd';
import CountUp from 'react-countup';
import myContext from '../../context/myContext';

const formatter = (value) => <CountUp end={value} separator="," />;

const Stats = () => {

    // context
    const context = useContext(myContext);
    const { loading, getAllItems, getAllAvailableItems, getAllSoldItems, searchKey, itemSoldTotal } = context;

    return (
        <div className='w-[200px] rounded-xl flex justify-center items-center m-10 border-2 p-3 shadow-md bg-woods-tan/20'>
            <Statistic title="Available Items" value={getAllAvailableItems.length} formatter={formatter} />            
        </div>
    )
};

export default Stats;
import React from 'react';

function StatsBox(props) {
    const isPositiveWeek = props.percent_value > 0;
    const isPositiveMonth = props.value_week > 0;
    const textColorWeek = isPositiveWeek ? 'green_text' : 'red_text';
    const textColorMonth = isPositiveMonth ? 'green_text' : 'red_text';

    return (
        <div className={`w-[22rem] h-[10rem] shadow-xl rounded-xl ${props.background}`}>
            <div className='ml-5  flex flex-col justify-evenly h-full'>
                <h5 className={` uppercase font-light ${props.text} `}>{props.title}</h5>
                <h4 className={` uppercase font-bold  ${props.text}`}>
                    {props.value}
                </h4>
                <div className='flex flex-row w-full items-center justify-between'>
                    <p className={`white_text uppercase  ${textColorMonth}`}>
                        {props.percent_value}% this month
                    </p>
                    <p className={`white_text uppercase mr-5  ${textColorWeek}`}>
                        {props.value_week}% this week
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StatsBox;

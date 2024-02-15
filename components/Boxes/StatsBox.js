function StatsBox(props) {
    const isPositiveWeek = props.percent_value > 0;
    const isPositiveMonth = props.value_week > 0;
    const textColorWeek = isPositiveWeek ? 'green_text' : 'red_text';
    const textColorMonth = isPositiveMonth ? 'green_text' : 'red_text';

    return (
        <div className="small_box">
            <div className='flex flex-col items-start justify-center'>
                <h5 className="">{props.title}</h5>
                <h4 className="">
                    {props.value}
                </h4>
                <div className=''>
                    <h5 className={textColorWeek}>
                        {props.percent_value ? (`${props.percent_value}% această lună`) : (null)}

                    </h5>
                    <h5 className={textColorWeek}>
                        {props.percent_value ? (`${props.percent_value}% această săptamână`) : (null)}
                    </h5>
                </div>
            </div>
        </div >
    );
}

export default StatsBox;

import React, { Component } from 'react';
import './MyStarItem.css';
import leet from "../images/LeetCode_name.png";
import top from "../images/TopCoder_name.png";
import at from "../images/AtCoder_name.png";

class MyStarItem extends Component {
    constructor(props) {
        super(props)
    }

    render()
    {
        const {site, title, startTime, url} = this.props;

        const tmp_koreanTime = new Date(startTime.slice(0, -1));
        const koreanTime = this.dateToString(tmp_koreanTime);
        
        return()
        {
            <div>
                <div
                    className = "star-item-title"
                    onClick={() => {window.open(url)}}>{title}</div>
            </div>
        }
    }
}

export default MyStarItem;
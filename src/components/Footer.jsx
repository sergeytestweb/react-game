import React from 'react';

const footer = () => {
    return (
        <div className="footer" style={{backgroundColor: 'grey', width: "300px", marginTop: "5px", borderRadius: "5px"}}>
        <div>
            <a target="_blank" href="https://github.com/sergeytestweb" style={{color: 'black', fontSize: '14px'}}>Created by sergeytestweb 2k21
            </a>
            <a target="_blank" href="https://rs.school/js/"><img width="55" src="https://rs.school/images/rs_school_js.svg" alt="rss" style={{marginLeft: "25px", marginTop: "5px"}}/>
            </a>
        </div>
    </div>
      );
}

export default footer;

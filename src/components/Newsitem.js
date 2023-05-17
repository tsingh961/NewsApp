import React from 'react'

const Newsitem = (props) => {

        let {title, description, imageUrl, newsUrl, date, author, source} = props;
        return (
            <div className='my-3'>
                <div className="card">
                <span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{zIndex: "1", left: "70%",top: "-1%"}}>{source}</span>
                    <img src={imageUrl ? imageUrl : "https://glints.com/id/lowongan/wp-content/uploads/2020/10/logo-reactjs.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">                        
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toLocaleString()}</small></p>
                        <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-dark btn-sm" >Read More</a>
                    </div>
                </div>
            </div>
        )

}

export default Newsitem
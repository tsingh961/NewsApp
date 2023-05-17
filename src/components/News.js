import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [state, setState] = useState({
        articles: [],
        loading: false,
        page: 1,
        totalResults: 0
    }
    )

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${state.page}&pageSize=${props.pageSize}`;
        props.setProgress(10)
        setState({...state, loading: true });
        let data = await fetch(url);
        props.setProgress(30)
        let parsedData = await data.json();
        props.setProgress(70)
        setState({
            ...state,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        props.setProgress(100)

    }

    const fetchMoreData = async () => {
        // setState({
        //     page: state.page + 1
        // })
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${state.page + 1}&pageSize=${props.pageSize}`;
        // setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        setState({
            ...state, // spread-operator
            page: state.page + 1,
            articles: state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
            // loading: false
        });
    };

    useEffect(() => {
        document.title = `${capitalize(props.category)} - NewsApp`
        updateNews();
        // eslint-disable-next-line
    }, [])

    // const componentDidMount = async() => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    //     // setState({ loading: true });
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // setState({
    //     //     articles: parsedData.articles,
    //     //     totalResults: parsedData.totalResults,
    //     //     loading: false
    //     // });
    //     // console.log(parsedData);
    //     updateNews();
    // }

    // handlePrevClick = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${state.page - 1}&pageSize=${props.pageSize}`;
    //     // setState({ loading: true });
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // // setState({articles: parsedData.articles});
    //     // setState({
    //     //     articles: parsedData.articles,
    //     //     page: state.page - 1,
    //     //     pageNum: Math.ceil(state.totalResults / props.pageSize),
    //     //     loading: false
    //     // })
    //     updateNews();
    //     setState({
    //         page: state.page - 1
    //     })
    // }

    // handleNextClick = async () => {
    // if (state.page + 1 > Math.ceil(state.totalResults/props.pageSize)) {

    // }
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${state.page + 1}&pageSize=${props.pageSize}`;
    // setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // setState({
    //     articles: parsedData.articles,
    //     page: state.page + 1,
    //     pageNum: Math.ceil(state.totalResults / props.pageSize),
    //     loading: false
    // })
    //     updateNews();
    //     setState({
    //         page: state.page + 1
    //     })

    // }


    return (
        <>
            <h1 className='text-center' style={{ margin: "30px 0", marginTop: "80px" }}>NewsApp - Top {capitalize(props.category)} Headlines</h1>
            {state.loading && <Loading />}

            <InfiniteScroll
                dataLength={state.articles.length}
                next={fetchMoreData}
                hasMore={state.articles.length !== state.totalResults}
                loader={<Loading/>}
            >
                <div className="container">
                    <div className="row">
                        {state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem description={element.description ? element.description : ""} title={element.title ? element.title : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>

            </InfiniteScroll>
            {/* <div className="container my-3 d-flex justify-content-between">
                    <button type="button" disabled={state.page <= 1} onClick={handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                    <button type="button" disabled={state.page >= state.pageNum} onClick={handleNextClick} className="btn btn-dark">Next &rarr;</button>
                </div> */}
        </>
    )

}

export default News

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

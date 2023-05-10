import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loading from './Loading'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    
    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title = `${this.capitalize(this.props.category)} - NewsApp`
        }


    async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9a0e17356706425d8e4ba0812deb6719&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9a0e17356706425d8e4ba0812deb6719&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // });
        // console.log(parsedData);
        this.updateNews();
    }

    handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9a0e17356706425d8e4ba0812deb6719&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // // this.setState({articles: parsedData.articles});
        // this.setState({
        //     articles: parsedData.articles,
        //     page: this.state.page - 1,
        //     pageNum: Math.ceil(this.state.totalResults / this.props.pageSize),
        //     loading: false
        // })
        this.updateNews();
        this.setState({ 
            page: this.state.page - 1
        })
    }

    handleNextClick = async () => {
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)) {

        // }
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9a0e17356706425d8e4ba0812deb6719&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     articles: parsedData.articles,
        //     page: this.state.page + 1,
        //     pageNum: Math.ceil(this.state.totalResults / this.props.pageSize),
        //     loading: false
        // })
        this.updateNews();
        this.setState({ 
            page: this.state.page + 1
        })

    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{ margin: "30px 0" }}>NewsApp - Top {this.capitalize(this.props.category)} Headlines</h1>
                {this.state.loading && <Loading />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem description={element.description ? element.description : ""} title={element.title ? element.title : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container my-3 d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                    <button type="button" disabled={this.state.page >= this.state.pageNum} onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
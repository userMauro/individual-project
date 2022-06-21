import { connect } from "react-redux";
import { Component } from "react";

// import { useParams } from 'react-router-dom';
// let { id } = useParams();

export class Activities extends Component {
    constructor (props){
        super (props);
        this.state = {
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            idCountries: [],
        };
        this.handleClick = this.handleClick.bind(this);
    };

    componentDidMount() {
        this.props.getAllCountries();
    };

    handleClick() {
        this.setState({
            ...this.state,
            idCountries: this.state.idCountries.filter(c => c !== e.target.value)
        });
    };

    render() {
        return (
            <div></div>
        );
    };

};

export function mapStateToProps(state) {
    return {
    countries: state.countries,
    }
};

export function mapDispatchToProps(dispatch) {
    return {
        getAllCountries: () => dispatch(getAllCountries()),
        createActivity: (a) => dispatch(createActivity(a)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
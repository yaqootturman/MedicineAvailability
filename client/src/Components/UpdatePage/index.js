import React, { Component } from 'react'
import UpdateForm from '../UpdateForm'
import NavBar from '../NavBar'
import UserSearchResults from '../UserSearchResults'
import axios from 'axios'
import './style.css'

class UpdatePage extends Component {
	state = {
		details: '',
		login: false,
		username: '',
		loading: true
	}
	componentDidMount = () => {
		const { history } = this.props

		axios.get('/check-auth').then(({ data }) => {
			const { success, username } = data

			if (success) {
				this.update()

				this.setState({
					login: true,
					username
				})
			} else {
				history.push('/login')
			}
		})
	}

	update = () => {
		const { medname } = this.props.match.params
		axios.get(`/api/pharmacy/medicine/${medname}`).then(({ data }) => {
			this.setState({
				details: data,
				loading: false
			})
		})
	}

	submitHandler = () => {
		const { history } = this.props

		history.push(`/pharmacy`)
	}

	render() {
		const { details, login, username, loading } = this.state
		return (
			<>
				{!loading ? (
					!details ? (
						<div>
							<img
								className="image"
								src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result.gif"
							/>
							<button
								className="backBtn"
								type="submit"
								onClick={this.submitHandler}
							>
								back
							</button>
						</div>
					) : (
						<>
							<NavBar login={login} username={username} {...this.props} />
							<UserSearchResults
								img={details.img}
								description={details.description}
								medicinename={details.name}
							/>
							<UpdateForm details={details} />
						</>
					)
				) : (
					<p>loading</p>
				)}
			</>
		)
	}
}
export default UpdatePage

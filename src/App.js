import React from 'react'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import { Accordion, Button } from 'react-bootstrap'
import axios from 'axios';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

const App = ({ projects }) => {

  const [data, setData] = React.useState({})

  React.useEffect(() => {
    axios({
        method: "get",
        url: "http://localhost:4000/letsVisitTG/getHotel",
        params: {
          location: "Athens",
          checkin: "2021-07-12",
          checkout: "2021-07-21",
          rooms: "1",
          adults: "2",
          children: "1" ,
		  infants: "10"
        }
    }).then((resp) => {
        setData(resp.data)
    });
  }, [])

    return (
          <Accordion>
			{data.data && data.data.hotels.map((hotel, index)=> {
				return (
					<Card key={index}>
						<Card.Header>
							<Accordion.Toggle as={Button} variant="link" eventKey={hotel.code}>
								<p>{hotel.name}</p>
								<img src={hotel.photo} alt="GeeksforGeeks logo"/>
							</Accordion.Toggle>
							<p>Starting Price: {hotel.minprice}</p>
						</Card.Header>
							<Accordion.Collapse eventKey={hotel.code}>
							<Card.Body>
								{hotel.rates.map((rate)=> {
									return (
										<div>
											<h6 style={{color: "violet"}} key={rate.id}>
												{rate.room}  Price: {rate.price}
											</h6>
											<img src={rate.photo}
													alt="GeeksforGeeks logo"/>
											<p>
												{rate.rate_desc}
											</p>
										</div>
									)
								})}
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				)
			})}
        </Accordion>   
    )
};

export default App
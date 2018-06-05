import React from 'react';
import ReactDOM from 'react-dom';

import { Carousel,Well,Grid,Row,Col,Panel,ProgressBar,Alert,Button,Clearfix,Badge,Label,Image,Table } from 'react-bootstrap';
import { ListGroup,ListGroupItem } from 'react-bootstrap';
import { Nav,NavItem,NavDropdown,MenuItem,Navbar,FormGroup,FormControl } from 'react-bootstrap';
import { DropdownButton, SplitButton, ButtonToolbar, Dropdown } from 'react-bootstrap';

class Index extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onSelectAlert = this.onSelectAlert.bind(this);

        this.state = {
            show: true
        };
    }

    renderCarousel(){
        // refer https://react-bootstrap.github.io/components/carousel/
        return(
            <Carousel>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="./images/carousel.png" />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="./images/carousel.png" />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="./images/carousel.png" />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
    }

    renderWell(){
        return(
            <Well>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas sed diam eget risus varius blandit sit amet non magna.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                Cras mattis consectetur purus sit amet fermentum.
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                Aenean lacinia bibendum nulla sed consectetur.
            </Well>
        )
    }

    renderPanels(){
        return(
            <Row>
                <Col sm={4}>
                    <Panel bsStyle="default">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Panel heading</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>Panel content</Panel.Body>
                    </Panel>
                    <Panel bsStyle="primary">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Panel heading</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>Panel content</Panel.Body>
                    </Panel>
                </Col>
                <Col sm={4}>
                    <Panel bsStyle="success">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Panel heading</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>Panel content</Panel.Body>
                    </Panel>
                    <Panel bsStyle="info">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Panel heading</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>Panel content</Panel.Body>
                    </Panel>
                </Col>
                <Col sm={4}>
                    <Panel bsStyle="warning">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Panel heading</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>Panel content</Panel.Body>
                    </Panel>
                    <Panel bsStyle="danger">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Panel heading</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>Panel content</Panel.Body>
                    </Panel>
                </Col>
            </Row>
        )
    }

    renderLisgGroup(){
        return(
            <Row>
                <Col sm={4}>
                    <ListGroup>
                        <ListGroupItem href="#" active>Cras justo odio</ListGroupItem>
                        <ListGroupItem href="#">Dapibus ac facilisis in</ListGroupItem>
                        <ListGroupItem href="#" disabled>Morbi leo risus</ListGroupItem>
                        <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                        <ListGroupItem>Vestibulum at eros</ListGroupItem>
                    </ListGroup>
                </Col>
                <Col sm={4}>
                    <ListGroup>
                        <ListGroupItem href="#" bsStyle="success">Cras justo odio</ListGroupItem>
                        <ListGroupItem href="#" bsStyle="info">Dapibus ac facilisis in</ListGroupItem>
                        <ListGroupItem href="#" bsStyle="warning">Morbi leo risus</ListGroupItem>
                        <ListGroupItem href="#" bsStyle="danger">Porta ac consectetur ac</ListGroupItem>
                        <ListGroupItem href="#" bsStyle="danger" disabled>Vestibulum at eros</ListGroupItem>
                    </ListGroup>
                </Col>
                <Col sm={4}>
                    <ListGroup>
                        <ListGroupItem header="Heading 1">Some body text</ListGroupItem>
                        <ListGroupItem header="Heading 2" href="#">Linked item</ListGroupItem>
                        <ListGroupItem header="Heading 3" bsStyle="info">Info styling</ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        )
    }

    renderProgressBars(){
        return(
            <div>
                <ProgressBar now={60} />
                <ProgressBar bsStyle="success" now={40} />
                <ProgressBar bsStyle="info" now={20} />
                <ProgressBar bsStyle="warning" now={60} />
                <ProgressBar bsStyle="danger" now={80} />
                <ProgressBar striped now={50} />
                <ProgressBar>
                    <ProgressBar striped bsStyle="success" now={35} key={1} />
                    <ProgressBar bsStyle="warning" now={20} key={2} />
                    <ProgressBar active bsStyle="danger" label={'10%'} now={10} key={3} />
                </ProgressBar>
            </div>
        )
    }

    handleDismiss() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    renderAlert(){
        let danger = this.state.show ? (
                <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                    <h4>Oh snap! You got an error!</h4>
                    <p>
                        Change this and that and try again. Duis mollis, est non commodo
                        luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                        Cras mattis consectetur purus sit amet fermentum.
                    </p>
                    <p>
                        <Button bsStyle="danger">Take this action</Button>
                        <span> or </span>
                        <Button onClick={this.handleDismiss}>Hide Alert</Button>
                    </p>
                </Alert>
            ) : (<Button onClick={this.handleShow}>Show Alert</Button>);

        return(
            <div>
                <Alert bsStyle="success"><strong>Well done!</strong>You successfully read this important alert message.</Alert>
                <Alert bsStyle="info"><strong>Heads up!</strong> This alert needs your attention, but it's not super important.</Alert>
                <Alert bsStyle="warning"><strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.</Alert>
                {danger}
            </div>
        )
    }

    renderNavBars(){
        let common = (<Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Project name</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        About
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        Contact
                    </NavItem>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem header>Header</MenuItem>
                        <MenuItem eventKey={3.4}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>);
        let inverse = (<Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#brand">React-Bootstrap</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        Link
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        Link
                    </NavItem>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">
                        Link Right
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        Link Right
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>);
        let search = (<Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Brand</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Text>
                        Signed in as: <Navbar.Link href="#">Mark Otto</Navbar.Link>
                    </Navbar.Text>
                    <Navbar.Form pullRight>
                        <FormGroup>
                            <FormControl type="text" placeholder="Search" />
                        </FormGroup>{' '}
                        <Button type="submit">Submit</Button>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>);
        return(
            <div>
                {common}
                {inverse}
                {search}
            </div>
        )
    }

    handleSelect(selectedKey) {
        alert(`selected ${selectedKey}`);
    }

    renderNavs(){
        let pills = (<Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect}>
                <NavItem eventKey={1} href="/home">
                    NavItem 1 content
                </NavItem>
                <NavItem eventKey={2} title="Item">
                    NavItem 2 content
                </NavItem>
                <NavItem eventKey={3} disabled>
                    NavItem 3 content
                </NavItem>
            </Nav>);
        let tabs = (<Nav bsStyle="tabs" activeKey="1" onSelect={k => this.handleSelect(k)}>
                <NavItem eventKey="1" href="/home">
                    NavItem 1 content
                </NavItem>
                <NavItem eventKey="2" title="Item">
                    NavItem 2 content
                </NavItem>
                <NavItem eventKey="3" disabled>
                    NavItem 3 content
                </NavItem>
                <NavDropdown eventKey="4" title="Dropdown" id="nav-dropdown">
                    <MenuItem eventKey="4.1">Action</MenuItem>
                    <MenuItem eventKey="4.2">Another action</MenuItem>
                    <MenuItem eventKey="4.3">Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="4.4">Separated link</MenuItem>
                </NavDropdown>
            </Nav>);
        let stacked = (<Nav bsStyle="pills" stacked activeKey={1} onSelect={this.handleSelect}>
                <NavItem eventKey={1} href="/home">
                    NavItem 1 content
                </NavItem>
                <NavItem eventKey={2} title="Item">
                    NavItem 2 content
                </NavItem>
                <NavItem eventKey={3} disabled>
                    NavItem 3 content
                </NavItem>
            </Nav>);
        let justify = (<div>
                <Nav
                    bsStyle="tabs"
                    justified
                    activeKey={1}
                    onSelect={key => this.handleSelect(key)}
                >
                    <NavItem eventKey={1} href="/home">
                        NavItem 1 content
                    </NavItem>
                    <NavItem eventKey={2} title="Item">
                        NavItem 2 content
                    </NavItem>
                    <NavItem eventKey={3} disabled>
                        NavItem 3 content
                    </NavItem>
                </Nav>
                <br />
                <Nav
                    bsStyle="pills"
                    justified
                    activeKey={1}
                    onSelect={key => this.handleSelect(key)}
                >
                    <NavItem eventKey={1} href="/home">
                        NavItem 1 content
                    </NavItem>
                    <NavItem eventKey={2} title="Item">
                        NavItem 2 content
                    </NavItem>
                    <NavItem eventKey={3} disabled>
                        NavItem 3 content
                    </NavItem>
                </Nav>
            </div>);
        return(
            <div>
                {pills}<br />
                {tabs}<br />
                {stacked}<br />
                {justify}
            </div>
        )
    }

    onSelectAlert(eventKey) {
        alert(`Alert from menu item.\neventKey: ${eventKey}`);
    }

    renderDropdowns(){
        return(
            <div>
                <ButtonToolbar>

                    <DropdownButton bsStyle='default' title='No caret' key='0' id='dropdown-basic-0' noCaret>
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3" active>
                            Active Item
                        </MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </DropdownButton>

                    <DropdownButton bsStyle='primary' title='Primary' key='1' id='dropdown-basic-1'>
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3" active>
                            Active Item
                        </MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </DropdownButton>

                    <SplitButton bsStyle='success' title='Success' key='2' id='dropdown-basic-2'>
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3" active>
                            Active Item
                        </MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </SplitButton>

                    <SplitButton bsStyle='info' title='Right dropup' key='3' id='dropdown-basic-3' dropup pullRight>
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3" active>
                            Active Item
                        </MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </SplitButton>

                </ButtonToolbar>

                <br />

                <ButtonToolbar>

                    <DropdownButton bsStyle='warning' bsSize="large" title="Large button" id="dropdown-size-large">
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </DropdownButton>

                    <DropdownButton bsStyle='danger' bsSize="small" title="Small button" id="dropdown-size-small">
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </DropdownButton>

                    <DropdownButton bsSize="xsmall" title="Extra small button" id="dropdown-size-extra-small">
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </DropdownButton>

                </ButtonToolbar>

                <br />

                <Clearfix>
                    <ul className="theme-dropdown dropdown-menu open">
                        <MenuItem header>Header</MenuItem>
                        <MenuItem>link</MenuItem>
                        <MenuItem divider />
                        <MenuItem header>Header</MenuItem>
                        <MenuItem>link</MenuItem>
                        <MenuItem disabled>disabled</MenuItem>
                        <MenuItem title="See? I have a title.">link with title</MenuItem>
                        <MenuItem eventKey={1} href="#someHref">
                            link that alerts
                        </MenuItem>
                    </ul>
                </Clearfix>
            </div>
        )
    }

    renderBadges(){
        return(
            <div>
                <p><a href="#">Inbox <Badge>42</Badge></a></p>
                <Nav bsStyle="pills">
                    <NavItem href="#" active>Home <Badge>42</Badge></NavItem>
                    <NavItem href="#">Profile</NavItem>
                    <NavItem href="#">Messages<Badge>3</Badge></NavItem>
                </Nav>
            </div>
        )
    }

    renderLabels(){
        return(
            <div>
                <Label bsStyle="default">Default</Label>{' '}
                <Label bsStyle="primary">Primary</Label>{' '}
                <Label bsStyle="success">Success</Label>{' '}
                <Label bsStyle="info">Info</Label>{' '}
                <Label bsStyle="warning">Warning</Label>{' '}
                <Label bsStyle="danger">Danger</Label>
            </div>
        )
    }

    renderImages(){
        return(
            <Row>
                <Col xs={6} md={4}>
                    <Image src="./images/thumbnail.png" rounded />
                </Col>
                <Col xs={6} md={4}>
                    <Image src="/images/thumbnail.png" circle />
                </Col>
                <Col xs={6} md={4}>
                    <Image src="./images/thumbnail.png" thumbnail />
                </Col>
            </Row>
        )
    }

    renderTables(){
        return(
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </Table>
        )
    }

    renderButtons(){
        return(
            <div>

                <ButtonToolbar>
                    {/* Standard button */}
                    <Button>Default</Button>

                    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                    <Button bsStyle="primary">Primary</Button>

                    {/* Indicates a successful or positive action */}
                    <Button bsStyle="success">Success</Button>

                    {/* Contextual button for informational alert messages */}
                    <Button bsStyle="info">Info</Button>

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="warning">Warning</Button>

                    {/* Indicates a dangerous or potentially negative action */}
                    <Button bsStyle="danger">Danger</Button>

                    {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
                    <Button bsStyle="link">Link</Button>

                    <Button disabled>Disabled</Button>

                    <Button active>Active</Button>
                </ButtonToolbar>

                <br />

                <ButtonToolbar>

                    <Button bsStyle="primary" bsSize="large">Large button</Button>

                    <Button>Default button</Button>

                    <Button bsStyle="success" bsSize="small">Small button</Button>

                    <Button bsStyle="info" bsSize="xsmall">Extra small button</Button>

                </ButtonToolbar>

            </div>
        )
    }

    render(){
        let _Carousel = this.renderCarousel();
        let _Well = this.renderWell();
        let _Panels = this.renderPanels();
        let _ListGroup = this.renderLisgGroup();
        let _ProgressBars = this.renderProgressBars();
        let _Alert = this.renderAlert();
        let _NavBars = this.renderNavBars();
        let _Navs = this.renderNavs();
        let _DropDowns = this.renderDropdowns();
        let _Badges = this.renderBadges();
        let _Labels = this.renderLabels();
        let _Images = this.renderImages();
        let _Tables = this.renderTables();
        let _Buttons = this.renderButtons();

        return(
            <Grid className="p-index">
                <Navbar inverse fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">React-Bootstrap</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#" active>Home</NavItem>
                            <NavItem eventKey={2} href="#">About</NavItem>
                            <NavItem eventKey={3} href="#">Contact</NavItem>
                            <NavDropdown title="Dropdown">
                                <MenuItem eventKey={3.1}>Action</MenuItem>
                                <MenuItem eventKey={3.2}>Another action</MenuItem>
                                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem header>Nav header</MenuItem>
                                <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <div className="container theme-showcase" role="main">

                    <div className="jumbotron">
                        <h1>Theme example</h1>
                        <p>This is a template showcasing the optional theme stylesheet included in Bootstrap. Use it as a starting point to create something more unique by building on or modifying it.</p>
                    </div>

                    <div className="page-header"><h1>Buttons</h1></div>{_Buttons}
                    <div className="page-header"><h1>Tables</h1></div>{_Tables}
                    <div className="page-header"><h1>Thumbnails</h1></div>{_Images}
                    <div className="page-header"><h1>Labels</h1></div>{_Labels}
                    <div className="page-header"><h1>Badges</h1></div>{_Badges}
                    <div className="page-header"><h1>Dropdown menus</h1></div>{_DropDowns}
                    <div className="page-header"><h1>Navs</h1></div>{_Navs}
                    <div className="page-header"><h1>Navbars</h1></div>{_NavBars}
                    <div className="page-header"><h1>Alerts</h1></div>{_Alert}
                    <div className="page-header"><h1>Progress bars</h1></div>{_ProgressBars}
                    <div className="page-header"><h1>List groups</h1></div>{_ListGroup}
                    <div className="page-header"><h1>Panels</h1></div>{_Panels}
                    <div className="page-header"><h1>Wells</h1></div>{_Well}
                    <div className="page-header"><h1>Carousel</h1></div>{_Carousel}
                </div>

            </Grid>
        )
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('root'));
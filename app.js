const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path'); 

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


let orders = [
    {
        serialNo: 1,
        instituteName: "Netaji Subhas University of Technology (NSUT)",
        instituteImages: ["/images/nn.jpg", "/images/nsut_campus.webp", "/images/nnn.jpeg"],
        details1: "Procurement of computers and peripherals for the Computer Science department.",
        details2: "Procurement of computers and peripherals for the Computer Science department. Includes software licenses and technical support.",
        lowestBid: NaN
    },
    {
        serialNo: 2,
        instituteName: "Delhi Technological University (DTU)",
        instituteImages: ["/images/dtu.jpg", "/images/dtu_campus.jpg", "/images/dtu_lab.jpg"],
        details1: "Supply and installation of advanced laboratory equipment for the Mechanical Engineering department.",
        details2: "Supply and installation of advanced laboratory equipment for the Mechanical Engineering department. Includes maintenance and training.",
        lowestBid: NaN
    },
    {
        serialNo: 3,
        instituteName: "Indian Institute of Technology (IIT) Bombay",
        instituteImages: ["/images/iit_bombay.jpg", "/images/iit_bombay_campus.jpg", "/images/iit_bombay_research.jpg"],
        details1: "Acquisition of high-performance computing clusters for research purposes.",
        details2: "Acquisition of high-performance computing clusters for research purposes. Includes installation and configuration.",
        lowestBid: NaN
    },
    {
        serialNo: 4,
        instituteName: "Indian Institute of Technology (IIT) Delhi",
        instituteImages: ["/images/iit_delhi.jpg", "/images/iit_delhi_campus.jpg", "/images/iit_delhi_labs.jpg"],
        details1: "Upgrade of networking infrastructure and data storage systems.",
        details2: "Upgrade of networking infrastructure and data storage systems. Includes cabling, routers, and data servers.",
        lowestBid: NaN
    },
    {
        serialNo: 5,
        instituteName: "National Institute of Technology (NIT) Trichy",
        instituteImages: ["/images/nit_trichy.jpg", "/images/nit_trichy_campus.jpg", "/images/nit_trichy_lab.jpg"],
        details1: "Procurement of new engineering tools and lab equipment for the Civil Engineering department.",
        details2: "Procurement of new engineering tools and lab equipment for the Civil Engineering department. Includes calibration and training services.",
        lowestBid: NaN
    },
    {
        serialNo: 6,
        instituteName: "National Institute of Technology (NIT) Warangal",
        instituteImages: ["/images/nit_warangal.jpg", "/images/nit_warangal_campus.jpg", "/images/nit_warangal_lab.jpg"],
        details1: "Installation of state-of-the-art machinery for the Electronics and Communication Engineering department.",
        details2: "Installation of state-of-the-art machinery for the Electronics and Communication Engineering department. Includes setup and initial testing.",
        lowestBid: NaN
    },
    {
        serialNo: 7,
        instituteName: "Birla Institute of Technology and Science (BITS) Pilani",
        instituteImages: ["/images/bits_pilani.jpg", "/images/bits_pilani_campus.jpg", "/images/bits_pilani_library.jpg"],
        details1: "Purchase of new research equipment and upgrading existing labs.",
        details2: "Purchase of new research equipment and upgrading existing labs. Includes integration with existing systems.",
        lowestBid: NaN
    },
    {
        serialNo: 8,
        instituteName: "Indian Institute of Technology (IIT) Kanpur",
        instituteImages: ["/images/iit_kanpur.jpg", "/images/iit_kanpur_campus.jpg", "/images/iit_kanpur_research.jpg"],
        details1: "Acquisition of advanced simulation software and hardware for research.",
        details2: "Acquisition of advanced simulation software and hardware for research. Includes training for faculty and students.",
        lowestBid: NaN
    },
    {
        serialNo: 9,
        instituteName: "Indian Institute of Technology (IIT) Kharagpur",
        instituteImages: ["/images/iit_kharagpur.jpg", "/images/iit_kharagpur_campus.jpg", "/images/iit_kharagpur_facilities.jpg"],
        details1: "Upgrade of the campus-wide Wi-Fi network and security systems.",
        details2: "Upgrade of the campus-wide Wi-Fi network and security systems. Includes installation and network optimization.",
        lowestBid: NaN
    },
    {
        serialNo: 10,
        instituteName: "Indian Institute of Technology (IIT) Hyderabad",
        instituteImages: ["/images/iit_hyderabad.jpg", "/images/iit_hyderabad_campus.jpg", "/images/iit_hyderabad_lab.jpg"],
        details1: "Procurement of new AI and machine learning hardware for research labs.",
        details2: "Procurement of new AI and machine learning hardware for research labs. Includes setup, calibration, and integration.",
        lowestBid: NaN
    }
];



app.get('/', (req, res) => {
    res.render('index', { orders: orders });
});

app.get('/order/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const order = orders.find(o => o.serialNo === orderId);

    // Ensure `order.bids` exists
    if (!order.bids) {
        order.bids = [];
    }

    res.render('details', { order });
});

app.post('/bid/:serialNo', (req, res) => {
    const serialNo = parseInt(req.params.serialNo);
    const { vendorName, bidAmount } = req.body;
    const order = orders.find(o => o.serialNo === serialNo);
    
    if (order) {
        if (!order.bids) {
            order.bids = []; 
        }
        const bid = parseFloat(bidAmount);
        order.bids.push({ vendorName, bidAmount: bid });
        if (!isNaN(bid)) {
            if (isNaN(order.lowestBid) || bid < order.lowestBid) {
                order.lowestBid = bid;
            }
        }

        res.redirect(`/details/${serialNo}`);
    } else {
        res.status(404).send('Order not found');
    }
});

app.get('/details/:serialNo', (req, res) => {
    const serialNo = parseInt(req.params.serialNo, 10);
    const order = orders.find(o => o.serialNo === serialNo);

    if (order) {
        res.render('details', { order });
    } else {
        res.status(404).send("Order not found");
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
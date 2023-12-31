import Tour from '../models/Tour.js'

//create new tour

export const createTour = async(req,res)=>{
    const newTour = new Tour(req.body)

    try {
        const savedTour = await newTour.save()

        res.status(200).json({success:true, message:'Successfully Created', data: savedTour})

    } catch (error) {
        res.status(500).json({success:false, message:'Failed to Create. Try again'})
    }
}


//update tour
export const updateTour = async(req,res)=>{

    const id = req.params.id

    try {

        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})

        res.status(200).json({success:true, message:'Successfully Updated', data: updatedTour})

    } catch (error) {
        res.status(500).json({success:false, message:'failed to update. Try again'})
    }
}

//deleted tour
export const deleteTour = async (req,res)=>{
    const id = req.params.id

    try {
        await Tour.findByIdAndUpdate(id)
        res.status(200).json({success:true, message:'Successfully Deleted'})

    } catch (error) {
        res.status(500).json({success:false, message:'failed to update. Try again'})
    }
}

//getSingle Tour
export const getSingleTour = async(req,res)=>{
    const id = req.params.id

    try {
        const tour = await Tour.findById(id).populate('reviews')
        res.status(200).json({success:true, data: tour})

    } catch (error) {
        res.status(500).json({success:false, message:'Not found. Try again'})
    }
}

//getAll Tour
export const getAllTour = async(req,res)=>{
    //for pagination
    const page = parseInt(req.query.page)
    console.log(page)
    try {
        const tours = await Tour.find({}).populate('reviews').skip(page * 8).limit(8)
        res.status(200).json({success:true, count: tours.length, data: tours})
    } catch (error) {
        res.status(500).json({success:false, message:'Not found. Try again'})
    }
}


//get tour by search
export const getTourBySearch = async (req,res)=>{

    //here 'i' means case sensitive
    const city = new RegExp(req.query.city, 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try {
        //gte means greater than equal
        const tours = await Tour.find({city, distance: {$gte:distance}, maxGroupSize: {$gte:maxGroupSize}}).populate('reviews')

        res.status(200).json({success:true, data: tours})
    }catch (error) {
        res.status(500).json({success:false, message:'Not found. Try again'})
    }
}


//get Featured Tour
export const getFeaturedTour = async(req,res)=>{

    try {
        const tours = await Tour.find({featured: true}).populate('reviews').limit(8)
        res.status(200).json({success:true,message:'Successful', data: tours})
    } catch (error) {
        res.status(500).json({success:false, message:'Not found. Try again'})
    }
}


//get tours counts
export const getTourCount = async (req, res) =>{
    try {
        const tourCount = await Tour.estimatedDocumentCount();

        res.status(200).json({success:true, data: tourCount})
    }catch (error) {
        res.status(500).json({success:false, message:'failed to fetch'})
    }
}
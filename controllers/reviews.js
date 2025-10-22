
const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req,res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req,res) => {
  let { id , ReviewId } = req.params;

  await Listing.findByIdAndUpdate(id, {$pull: {reviews: ReviewId}});
  await Review.findByIdAndDelete(ReviewId);
req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
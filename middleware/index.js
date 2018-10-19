var Comment = require("../models/comment");
var Campground = require("../models/campground");
module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "Musisz być zalogowany!");
        res.redirect("/login");
    },
    checkUserCampground: function(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, campground){
               if(campground.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "Nie masz uprawnień by dokonać zmian!");
                   console.log("BADD!!!");
                   res.redirect("/campgrounds/" + req.params.id);
               }
            });
        } else {
            req.flash("error", "Musisz być zalogowany!");
            res.redirect("/login");
        }
    },
    checkUserComment: function(req, res, next){
        console.log("YOU MADE IT!");
        if(req.isAuthenticated()){
            Comment.findById(req.params.commentId, function(err, comment){
               if(comment.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "Nie masz uprawnień by dokonać zmian!");
                   res.redirect("/campgrounds/" + req.params.id);
               }
            });
        } else {
            req.flash("error", "Musisz być zalogowany!");
            res.redirect("login");
        }
    }
}
//store all daily events into object
events = {

};
//display current day at top of calendar
$("#currentDay").text(moment().format('MMM Do, YYYY'));
//store current moment in var so it will update each day
var dayAudit = moment();
//have time blocks only exist during office hours

//make time blocks color coded red if past or yellow if approaching

//make time blocks editable by clicking into them
$(".saveBtn").on("click", function(){
    //get textarea's current value/text
    var eventText = $(this).siblings(".event-text").val()
    var position = $(this).parent().index();


    console.log(position);
    //savePlanner();
});

//when blocks are saved or edited save to local storage
var savePlanner = function(){
    localStorage.setItem("events", JSON.stringify("events"))
}

//load local storage when page loads
var loadEvents = function(){
    events = JSON.parse(localStorage.getItem("events"));

if(!events){
    events = {
    }
}
}

//store all daily events into object
events = [
    {
        index: "0",
        militaryHour: "09",
        time: "09",
        ext: "am",
        text: "",
    },
    {
        index: "1",
        militaryHour: "10",
        time: "10",
        ext: "am",
        text: "",
    },
    {
        index:"2",
        militaryHour:"11",
        time:"11",
        ext:"am",
        text:""
    },
    {
        index:"3",
        militaryHour:"12",
        time:"12",
        ext:"pm",
        text:"",
    },
    {
        index:"4",
        militaryHour:"13",
        time:"01",
        ext:"pm",
        text:"",
    },
    {
        index:"5",
        militaryHour:"14",
        time:"02",
        ext:"pm",
        text:"",
    },
    {
        index:"6",
        militaryHour:"15",
        time:"03",
        ext:"pm",
        text:"",
    },
    {
        index: "7",
        militaryHour: "16",
        time:"04",
        ext:"pm",
        text:"",
    },
    {
        index:"8",
        militaryHour:"17",
        time:"05",
        ext:"pm",
        text:"",
    }
];
console.log(events);
//display current day at top of calendar
$("#currentDay").text(moment().format('MMM Do, YYYY'));

//when blocks are saved or edited save to local storage
var savePlanner = function(){
    localStorage.setItem("events", JSON.stringify(events))
}

//load local storage when page loads
var loadEvents = function(){
    events = JSON.parse(localStorage.getItem("events"));   
}
function auditDay (){
    var currentDay = JSON.parse(localStorage.getItem("events"));


    //savePlanner();
    loadEvents();
};
//load all rows with time, forms, and buttons
$.each(events, function(i, val){
    //create entire hour row
    //I can't create an ID of the current Index of the objects events[i].index
    var currentHour = $("<form>").attr({"class":"row justify-content-around"})

    $(".container").append(currentHour)
    //create hour section
    var currentTime = $("<div>").text(events[i].time +" " + events[i].ext).attr({"class":"col-2 hour"});
    //create event text area
    var currentEvent = $("<div>").attr({"class":"col-9 description p-0"});
    var currentEventData = $("<textarea>").attr({"class":"event-text col-12 h-100"});
    currentEventData.attr("id", events.index);
    currentEvent.append(currentEventData);

    if (events[i].militaryHour < moment().format("HH")){
        currentEventData.attr({"id":"houry"},{"class":"event-text past col-12 h-100",}).addClass(events[i].militaryHour)
    }else if (events[i].militaryHour == moment().format("HH")){
        currentEventData.attr({"id":"houry"},{"class":"event-text present col-12 h-100"}).addClass(events[i].militaryHour)
    }else if (events[i].militaryHour > moment().format("HH")){
        currentEventData.attr({"id":"houry"},{"class":"event-text future col-12 h-100"}).addClass(events[i].militaryHour)
    }
    currentHour.append(currentTime);
    currentHour.append(currentEvent);
    
    //create save buttons
    var saveBtnIcon = $("<span>").attr({"class":"oi oi-calendar"});
    var saveBtn = $("<button>").attr({"class":"col-1 saveBtn"});
    saveBtn.append(saveBtnIcon);
    currentHour.append(saveBtn);
    
    //create save button

});
//auditDay();

//save data btn function
$(".saveBtn").on("click", function(event){
    event.preventDefault();
    var eventText = $(this).parent().children().find(".event-text").val();
    var eventData = $(this).parent().children().find("#houry")
    var eventIndex = $(this).parent().index()
    eventData.append(eventText);
    events[eventIndex].text = eventText
    savePlanner();
}
    //loadEvents();
);

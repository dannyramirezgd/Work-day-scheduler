//store all info for each hour row as an array of objects
events = [
    {
        //to create class based on time of day
        militaryHour: "09",
        //to give row each label
        time: "09",
        //give each row context for am or pm
        ext: "am",
        //event text that user will input
        text: "",
    },
    {
        militaryHour: "10",
        time: "10",
        ext: "am",
        text: "",
    },
    {
        militaryHour:"11",
        time:"11",
        ext:"am",
        text:""
    },
    {
        militaryHour:"12",
        time:"12",
        ext:"pm",
        text:"",
    },
    {
        militaryHour:"13",
        time:"01",
        ext:"pm",
        text:"",
    },
    {
        militaryHour:"14",
        time:"02",
        ext:"pm",
        text:"",
    },
    {
        militaryHour:"15",
        time:"03",
        ext:"pm",
        text:"",
    },
    {
        militaryHour: "16",
        time:"04",
        ext:"pm",
        text:"",
    },
    {
        militaryHour:"17",
        time:"05",
        ext:"pm",
        text:"",
    }
];
//display current day at top of calendar
$("#currentDay").text(moment().format('MMM Do, YYYY'));

var storeCurrentDay = function () {
    localStorage.setItem("currentDate", JSON.stringify(moment().format("Do")));
}

//when blocks are saved or edited save to local storage
var savePlanner = function(){
    localStorage.setItem("today", JSON.stringify(events))
};

//load local storage but only for the current day
var loadEvents = function(){
    if (JSON.parse(localStorage.getItem("currentDate")) !== moment().format("Do")){
        localStorage.clear();
    }
    //when the clock hits 23:59, the local storage clears, otherwise it will display what it has
    if(localStorage.getItem("today") === null){
        events= [
            {
                //to create class based on time of day
                militaryHour: "09",
                //to give row each label
                time: "09",
                //give each row context for am or pm
                ext: "am",
                //event text that user will input
                text: "",
            },
            {
                militaryHour: "10",
                time: "10",
                ext: "am",
                text: "",
            },
            {
                militaryHour:"11",
                time:"11",
                ext:"am",
                text:""
            },
            {
                militaryHour:"12",
                time:"12",
                ext:"pm",
                text:"",
            },
            {
                militaryHour:"13",
                time:"01",
                ext:"pm",
                text:"",
            },
            {
                militaryHour:"14",
                time:"02",
                ext:"pm",
                text:"",
            },
            {
                militaryHour:"15",
                time:"03",
                ext:"pm",
                text:"",
            },
            {
                militaryHour: "16",
                time:"04",
                ext:"pm",
                text:"",
            },
            {
                militaryHour:"17",
                time:"05",
                ext:"pm",
                text:"",
            }
        ];
    } else {
        events = JSON.parse(localStorage.getItem("today"))
        } 
};
loadEvents();
//page load all rows with time, text areas, and buttons, along with any previous event data and classes
$.each(events, function(i){
    loadEvents();
    //create entire hour event row and append it to the container
    var currentHour = $("<form>").attr({"class":"row justify-content-around"})
    $(".container").append(currentHour)
    //create section to indicate the label for each hour
    var currentTime = $("<div>").text(events[i].time +" " + events[i].ext).attr({"class":"col-2 hour"});
    //create event text area for each hour
    var currentEvent = $("<div>").attr({"class":"col-9 description p-0"});
    var currentEventData = $("<textarea>").attr({"class":"event-text col-12 h-100"}).val(events[i].text);
    currentEvent.append(currentEventData);
    //check the time and color the row accordingly
    if (events[i].militaryHour < moment().format("HH")){
        currentEventData.addClass("past event-text col-12 h-100")
    }else if (events[i].militaryHour == moment().format("HH")){
        currentEventData.addClass("present event-text col-12 h-100")
    }else if (events[i].militaryHour > moment().format("HH")){
        currentEventData.addClass("future event-text col-12 h-100")
    }
    //append both the hour label and text area
    currentHour.append(currentTime);
    currentHour.append(currentEvent);
    
    //create save buttons
    var saveBtnIcon = $("<span>").addClass("oi oi-calendar");
    var saveBtn = $("<button>").addClass("col-1 saveBtn");
    saveBtn.append(saveBtnIcon);
    currentHour.append(saveBtn);
});

//when triggered, text value within textarea is captured and saved based on the row and saved to localStorage
$(".saveBtn").on("click", function(event){
    event.preventDefault();
    var eventText = $(this).parent().children().find(".event-text").val();
    var eventData = $(this).parent().children().find(".event-text")
    var eventIndex = $(this).parent().index()
    eventData.append(eventText);
    events[eventIndex].text = eventText
    savePlanner();
});
storeCurrentDay();
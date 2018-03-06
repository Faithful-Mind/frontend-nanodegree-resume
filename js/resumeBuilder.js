var work = {
    "jobs": [
        {
            "employer": "Chongqing Cable Network",
            "title": "Tech Engineer",
            "location": "Liangping County",
            "dates": "2016-07 to 2016-08",
            "description": "Tech support"
        }
    ]
}
var projects = {
    "projects": [
        {
            "title": "portfolio",
            "dates": "2016-12-01 to 2016-12-15",
            "description": "implementations of HTML and CSS",
            "images": ""
        }
    ],
    "display": function(){
        this.projects.forEach((project) => {
            $("#projects").append(HTMLprojectStart);
            $(".project-entry:last").append(HTMLprojectTitle.replace("%data%", project.title));
            $(".project-entry:last").append(HTMLprojectDates.replace("%data%", project.dates));
            $(".project-entry:last").append(HTMLprojectDescription.replace("%data%", project.description));
            $(".project-entry:last").append(HTMLprojectImage.replace("%data%", project.images));
        })
    }
}
var bio = {
    "name": "YUAN Ye",
    "role": "Web Developer",
    "welcomeMessage": "Hello World!",
    "biopic": "",
    "contacts": {
        "mobile": 18435168050,
        "email": "lpyy15@gmail.com",
        "github": "Faithful-Mind",
        "location": "Taiyuan"
    },
    "skills":["Java", "Python", "C lang", "Office skills"]
}
var education = {
    "schools": [
        {
            "name" : "Taiyuan University of Technology",
            "location" : "Taiyuan",
            "degreee": "Bachelor",
            "dates" : 2017,
            "url": "",
            "major" : ["Opt-electric Information Science and Engineering"]
        }
    ],
    "onlineCourses": [
        {
            "title": "cs01",
            "school": "Taiyuan University of Technology",
            "dates": 2016,
            "url": ""
        }
    ]
}

$("#header").append(HTMLheaderName.replace("%data%",bio.name))
$("#header").append(HTMLheaderRole.replace("%data%", bio.role))
$("#header").append(HTMLcontactGeneric.replace("%contact%", "E-mail").replace("%data%",bio.contacts.email))

if (bio.skills.length > 0) {
    $("#header").append(HTMLskillsStart);
    for (skill of bio.skills) {
        $("#skills").append(HTMLskills.replace("%data%", skill));
    }
}
function displayWork() {
    for (job in work.jobs) {
        $("#workExperience").append(HTMLworkStart);
        var s = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
        s += HTMLworkTitle.replace("%data%", work.jobs[job].title);
        s += HTMLworkDates.replace("%data%", work.jobs[job].dates);
        s += HTMLworkLocation.replace("%data%", work.jobs[job].location);
        s += HTMLworkDescription.replace("%data%", work.jobs[job].description);
        $(".work-entry:last").append(s);
    }
}

displayWork();

// $(document).click(function(loc) {
//   logClicks(loc.pageX, loc.pageY);
// });

// $("#main").append(internationalizeButton);

projects.display();
$("mapDiv").append(googleMap);

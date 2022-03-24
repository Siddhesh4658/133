img = "";
status = "";
objects = [];

function preload()
{
    img = loadimage("dog_cat.jpg");
}

function setup()
{
    canvas = CreateCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossed', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw()
{
    image(img, 0, 0, 640, 420);
    fill("#52697d");
    Text("Dog", 45, 75);
    noFill();
    stroke("#52697d");
    rect(30, 60, 450, 350 ); 
    
    fill("#52697d");
    Text("Cat", 320, 120);
    noFill();
    stroke("#52697d");
    rect(300, 90, 270, 320);
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

if(status !="")
{
    for(i = 0; i < objects.length; i++)
    {
        document.getElementById("status").innerHTML = "Status: Object Detected";

        fill("#52697d")
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#52697d");
        rect(objects[i].x , objects[i].y , objects[i].height , objects[i].width);
    }
}
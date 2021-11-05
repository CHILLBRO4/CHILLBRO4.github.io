function getName(){
    var name = document.getElementById('namei').value;
    localStorage.setItem("passName", name)
    var wname = document.getElementById('namew').value;
    localStorage.setItem("passWName", wname)
}
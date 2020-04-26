// making the new full route

$("#new-form").submit(function(event){
    event.preventDefault();
    $.post("/todos", $(this).serialize(), function(data){
        $(".list-group").append(
        `
        <div class="row " id="hide">
			<div class="col-md-6 col-md-offset-3">
				<h1>Edit Item</h1>
				<form action="/todos/${data._id}" method="POST" class="edit-form">
					<div class="form-group">
						<label>Item Text</label>
						<input type="text" value="${data.text}" name="todo[text]" class="form-control">
					</div>
					<button class="btn btn-primary">Update Item</button>
				</form>
			</div>
		</div>
        <li class="list-group-item">
			<span class="lead">
				${data.text}
			</span>
			<div class="pull-right">
                <button class="toggle-edit btn btn-warning btn-sm">Edit</button>
				<form style="display: inline" class="delete-form" method="POST" action="/todos/${data._id}">
					<button type="submit" class="btn btn-sm btn-danger ">Delete</button>
				</form>
			</div>
			<div class="clearfix"></div>
		</li>
        `
        )
    })
    $(this).find(".form-control").val("");
})


// making the edit toggle !!

$(".list-group").on("click", ".toggle-edit", function(){
    $(this).parent().parent().prev().toggle();
})

// handling the edit route
$(".list-group").on("submit", ".edit-form", function(event){
    event.preventDefault();
    var data = $(this).serialize();
    var putUrl = $(this).attr("action")
    var editForm = $(this);
    $.ajax({
        url: putUrl,
        type: "PUT",
        data: data,
        editForm: editForm,
        success: function (data){
            editForm.parent().parent().next(".list-group-item").html
            (`
            <span class="lead">
            ${data.text}
            </span>
            <div class="pull-right">
            <button class="toggle-edit btn btn-warning btn-sm">Edit</button>
            <form style="display: inline" method="POST" action="/todos/${data._id}?_method=DELETE" class="delete-form">
                <button type="submit" class="btn btn-sm btn-danger">Delete</button>
            </form>
            </div>
            <div class="clearfix"></div>
            `);
        }
    })
    $(this).find('input[type="text"]').val(" ");
})


// the delete route !!

$(".list-group").on("submit", ".delete-form", function(event){
    event.preventDefault();
    var url = $(this).attr("action");
    var toDo = $(this).parent().parent();
    $.ajax({
        url:url,
        type:"delete",
        toDo:toDo,
        success: function(data){
            toDo.remove();
        }
    })
})

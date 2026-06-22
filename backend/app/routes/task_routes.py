from flask import Blueprint
from flask import request
from flask import jsonify

from app.models.task import Task
from app.config.database import db

task_bp = Blueprint(
    "task_bp",
    __name__
)

@task_bp.route("/health")
def health():
    return jsonify({
        "status": "healthy"
    })


@task_bp.route("/tasks", methods=["GET"])
def get_tasks():

    tasks = Task.query.all()

    return jsonify(
        [task.to_dict() for task in tasks]
    )


@task_bp.route("/tasks", methods=["POST"])
def create_task():

    data = request.get_json()

    task = Task(
        title=data["title"],
        description=data.get(
            "description",
            ""
        ),
        status=data.get(
            "status",
            "Pending"
        )
    )

    db.session.add(task)
    db.session.commit()

    return jsonify(
        task.to_dict()
    ), 201


@task_bp.route(
    "/tasks/<int:task_id>",
    methods=["PUT"]
)
def update_task(task_id):

    task = Task.query.get(task_id)

    if not task:
        return jsonify({
            "error": "Task not found"
        }), 404

    data = request.get_json()

    task.title = data.get(
        "title",
        task.title
    )

    task.description = data.get(
        "description",
        task.description
    )

    task.status = data.get(
        "status",
        task.status
    )

    db.session.commit()

    return jsonify(
        task.to_dict()
    )


@task_bp.route(
    "/tasks/<int:task_id>",
    methods=["DELETE"]
)
def delete_task(task_id):

    task = Task.query.get(task_id)

    if not task:
        return jsonify({
            "error": "Task not found"
        }), 404

    db.session.delete(task)

    db.session.commit()

    return jsonify({
        "message": "Task deleted"
    })

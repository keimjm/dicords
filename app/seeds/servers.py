from app.models import db, Server, User


def seed_servers():
    users = User.query.all()
    db.session.add_all([
        Server(
            server_name="Demo Server",
            user_id=1,
            server_members=[x for x in users if x.username ==
                            "marnie" or x.username == "charlie"]
        ),
        Server(
            server_name="Marnie's Room",
            user_id=2,
            server_members=[x for x in users if x.username ==
                            "demo" or x.username == "chase"]
        ),
        Server(
            server_name="Bobbie's Burgers",
            user_id=3,
            server_members=[x for x in users if x.username ==
                            "demo" or x.username == "charlie"]
        ),
        Server(
            server_name="Milk Steak",
            user_id=4,
            server_members=[x for x in users if x.username ==
                            "demo" or x.username == "bobbie"]
        ),
        Server(
            server_name="Prodigious Stead",
            user_id=5,
            server_members=[x for x in users if x.username ==
                            "demo" or x.username == "marnie"]
        ),



    ])

    db.session.commit()


def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()

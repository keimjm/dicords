from app.models import db, Channel


def seed_channels():
    db.session.add_all([
        Channel(
            channel_name='general',
            server_id=1
        ),
        Channel(
            channel_name='chatting',
            server_id=1
        ),
        Channel(
            channel_name='general',
            server_id=2
        ),
        Channel(
            channel_name='melancholy',
            server_id=2
        ),
        Channel(
            channel_name='general',
            server_id=3
        ),
        Channel(
            channel_name='cooking',
            server_id=3
        ),
        Channel(
            channel_name='general',
            server_id=4
        ),
        Channel(
            channel_name="paddy's",
            server_id=4
        ),
        Channel(
            channel_name='general',
            server_id=5
        ),
        Channel(
            channel_name="confabulation",
            server_id=5
        ),


    ])
    db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()

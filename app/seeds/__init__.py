from flask.cli import AppGroup
from .users import seed_users, undo_users
from .relationships import seed_relationships, undo_relationships
from .members import seed_members, undo_members
from .channels import seed_channels, undo_channels
from .servers import seed_servers, undo_servers

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_members()
    seed_relationships()
    seed_servers()
    seed_channels()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_relationships()
    undo_members()
    undo_channels()
    undo_servers()
    # Add other undo functions here

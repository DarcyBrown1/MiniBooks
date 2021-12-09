# the order of imports is important here. "views" uses "main"
# so "main" must be imported before "views".
from ..blueprint import main
from . import views

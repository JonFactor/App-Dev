from rest_framework.exceptions import AuthenticationFailed
import jwt
from users.models import User

def getUser(request):
    
    token = request.COOKIES.get('jwt')
    print(token)

    if not token:
        raise AuthenticationFailed('Unauthenticated')

    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('jwt expired signature')

    return User.objects.filter(id=payload['id']).first()
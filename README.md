returnResponse is common response function.
list of params to passed.
1. response : Response contract object.
2. message: any message you want to passed on response.
3. status: status of the response.
4. data = object of array you want to passed.
5. errors: specially designed for exception handling.

__________________________________________________________________
if you want to override the response of your entire application 
copy and replace with Handler.ts code into your App/Exceptions.
and please dont forget to passed returnResponse function path.

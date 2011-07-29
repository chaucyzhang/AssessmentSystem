from dejavu import *
import datetime


class Account(Unit):
    username=UnitProperty(str)
    password=UnitProperty(str)
    usertype=UnitProperty(str)
    
class Programs(Unit):
    name=UnitProperty(str)
    
class Courses(Unit):
    name=UnitProperty(str)
    programid=UnitProperty(int)
    
class Assessmentplan(Unit):
    timeadded=UnitProperty(datetime.date)
    timemodified=UnitProperty(datetime.date)
    path=UnitProperty(str)
    programid=UnitProperty(int)
    courseid=UnitProperty(int)
    
class Outcomes(Unit):
    content=UnitProperty(str)
    programid=UnitProperty(int)
    courseid=UnitProperty(int)
    
class Eduobjs(Unit):
    content=UnitProperty(str)
    programid=UnitProperty(int)
    
class Evaluationdoc(Unit):
    timeadded=UnitProperty(datetime.date)
    timemodified=UnitProperty(datetime.date)
    path=UnitProperty(str)
    programid=UnitProperty(int)
    courseid=UnitProperty(int)
    
Courses.many_to_one('programid',Programs,'ID')
Assessmentplan.many_to_one('programid',Programs,'ID')
Assessmentplan.many_to_one('courseid',Courses,'ID')
Outcomes.many_to_one('programid',Programs,'ID')
Outcomes.many_to_one('courseid',Courses,'ID')
Eduobjs.many_to_one('programid',Programs,'ID')
Evaluationdoc.many_to_one('programid',Programs,'ID')
Evaluationdoc.many_to_one('courseid',Courses,'ID')
arena=Arena()
arena.add_store("main","mysql",{'host':"127.0.0.1",'port':3307,'user':"root",'passwd':"111",'db':"assessmentsystemdb"})
arena.register_all(globals())
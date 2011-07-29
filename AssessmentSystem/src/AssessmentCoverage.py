import os.path
import cherrypy
import json
from jinja2 import Template
from DAO import Dao
_curdir=os.path.join(os.getcwd(),os.path.dirname('__file__'))    
             
class AssessmentCoverage(object):
    _cp_config = {'tools.sessions.on': True}
    @cherrypy.expose
    def index(self):
        page = os.path.join(_curdir,"htmls/index.html")
        with open(page) as f:
            t = Template(f.read())
        return t.render()

    @cherrypy.expose
    def login(self,uname,passwd):
        username=uname
        password=passwd
        usertype=dao.login(username, password)
        cherrypy.session['usertype'] = usertype
        return usertype

    @cherrypy.expose
    def logout(self):
        session=cherrypy.session.get('usertype')
        if session:
            cherrypy.session['usertype'] = None
            cherrypy.session['programname'] = None 
            cherrypy.session['outcomeid'] = None
            return session         
        
    @cherrypy.expose
    def getSession(self):
        usertype=cherrypy.session.get("usertype")
        return usertype
    
    @cherrypy.expose
    def openAccount(self,username,passwd,usertype):
        resultStr=dao.openAccount(username, passwd, usertype)
        return resultStr
    
    @cherrypy.expose
    def addProgram(self,programName,programDes):
        return dao.addProgram(programName,programDes)
    
    @cherrypy.expose
    def addCourse(self,courseName,courseDes):
        if dao.addCourseName(courseName, courseDes):
            return "added"
        else:
            return "err"
    
    @cherrypy.expose
    def getAllPrograms(self):
        nameTuple=dao.getProgramNames()
        nameArray=json.dumps(nameTuple)
        return nameArray   
    
    @cherrypy.expose
    def storeProgramName(self,name):
        cherrypy.session['programname']=name
            
class ProgramPageHandler(object):
    _cp_config = {'tools.sessions.on': True}
    @cherrypy.expose
    def index(self):
        page = os.path.join(_curdir,"htmls/program.html")
        with open(page) as f:
            t = Template(f.read())
        return t.render()
    
    @cherrypy.expose
    def getProgramDetail(self):
        programName=cherrypy.session.get('programname')
        dic=dao.getProgramDetails(programName)
        return json.dumps(dic)
    
    @cherrypy.expose
    def addOutcome(self,outcome,name):
        programName=cherrypy.session.get('programname')
        if dao.addProgramOutcome(outcome,name, programName):
            return "added"
        else:
            return "failed"
        
    @cherrypy.expose
    def addEduObj(self,EduObj,name):
        programName=cherrypy.session.get('programname')
        if dao.addProgramEduObj(EduObj,name, programName):
            return "added"
        else:
            return "failed"
        
    @cherrypy.expose   
    def addCourseToProgram(self,courseName):
        programName=cherrypy.session.get('programname')
        if dao.addCourseToProgram(courseName, programName):
            return 'suc'
        else:return 'err'
     
        
    @cherrypy.expose
    def deleteProgramOutcome(self,outcomeid):
        if dao.deleteOutcome(outcomeid):
            return 'suc'
        else: return 'err'
    
    @cherrypy.expose
    def deleteProgramEduobj(self,eduobjid):
        if dao.deleteEduobj(eduobjid):
            return 'suc'
        else: return 'err'
        
    @cherrypy.expose
    def deleteCourseOfProgram(self,courseid):
        if dao.deleteCourse(courseid):
            return 'suc'
        else: return 'err'
        
    @cherrypy.expose
    def getCourses(self):
        programName=cherrypy.session.get('programname')
        courses=dao.getCourseList(programName)
        return json.dumps(courses)
    
    @cherrypy.expose
    def getFullCourses(self):
        courses=dao.getFullCourseList()
        return json.dumps(courses)
        
    @cherrypy.expose
    def storeOutcomeId(self,outcomeId):
        cherrypy.session['outcomeid']=outcomeId
        
    @cherrypy.expose
    def storeEduobjId(self,eduobjId):
        cherrypy.session['eduobjid']=eduobjId
        
    @cherrypy.expose
    def storeCourseId(self,courseId):
        cherrypy.session['courseid']=courseId
        
class CoursePageHandler(object):
    _cp_config = {'tools.sessions.on': True}
    @cherrypy.expose
    def index(self):
        page = os.path.join(_curdir,"htmls/course.html")
        with open(page) as f:
            t = Template(f.read())
        return t.render()

class ProgramResultPageHandler(object):
    _cp_config = {'tools.sessions.on': True}
    @cherrypy.expose
    def index(self):
        page = os.path.join(_curdir,"htmls/programResultPage.html")
        with open(page) as f:
            t = Template(f.read())
        return t.render()
    
class CourseResultPageHandler(object):
    _cp_config = {'tools.sessions.on': True}
    @cherrypy.expose
    def index(self):
        page = os.path.join(_curdir,"htmls/courseResultPage.html")
        with open(page) as f:
            t = Template(f.read())
        return t.render()
    
class AllUsersPageHandler(object):
    _cp_config = {'tools.sessions.on': True}
    @cherrypy.expose
    def index(self):
        page = os.path.join(_curdir,"htmls/allUsersPage.html")
        with open(page) as f:
            t = Template(f.read())
        return t.render()
    
class OutcomePageHandler(object):
    _cp_config = {'tools.sessions.on': True}
    @cherrypy.expose
    def index(self):
        page = os.path.join(_curdir,"htmls/outcomePage.html")
        with open(page) as f:
            t = Template(f.read())
        return t.render()
    
    @cherrypy.expose
    def getOutcomeAndCourse(self):
        outcomeid=cherrypy.session.get('outcomeid')
        courses=dao.getCourseWithOutcome(outcomeid)
        return json.dumps(courses)
    
    @cherrypy.expose
    def getCourseList(self):
        programName=cherrypy.session.get('programname')
        courses=dao.getCourseList(programName)
        return json.dumps(courses)
    
    @cherrypy.expose
    def addCourseToProgramOutcome(self,courseId):
        outcomeId=cherrypy.session.get('outcomeid')
        if dao.addCourseToProgramOutcome(outcomeId,courseId):
            return 'suc'
        else:return 'err'
        
    @cherrypy.expose
    def getOutcome(self):
        outcomeId=cherrypy.session.get('outcomeid')
        return dao.getOutcome(outcomeId)
    
class EduobjPageHandler(object):
    _cp_config = {'tools.sessions.on': True}
    @cherrypy.expose
    def index(self):
        page = os.path.join(_curdir,"htmls/EducationalObjectivesPage.html")
        with open(page) as f:
            t = Template(f.read())
        return t.render()
    
    @cherrypy.expose    
    def getEduobj(self):
        eduobjId=cherrypy.session.get('eduobjid')
        return dao.getEduobj(eduobjId)

application_conf = {
                        '/htmls': {
                                       'tools.staticdir.on': True,
                                       'tools.staticdir.dir': os.path.join(_curdir,
                                                                                 'htmls'),
                                                                               },
                        '/css': {
                                       'tools.staticdir.on': True,
                                       'tools.staticdir.dir': os.path.join(_curdir,
                                                                                 'css'),
                                                                                 },
                         '/js': {
                                       'tools.staticdir.on': True,
                                       'tools.staticdir.dir': os.path.join(_curdir,
                                                                                 'js'),
                                                                                 },  
                        '/images': {
                                       'tools.staticdir.on': True,
                                       'tools.staticdir.dir': os.path.join(_curdir,
                                                                                 'images'),
                                                                               },                                                          
                        }


if __name__=="__main__":    
    dao = Dao()           
    root = AssessmentCoverage()
    root.program=ProgramPageHandler()
    root.program.outcomePage=OutcomePageHandler()
    root.program.eduobjPage=EduobjPageHandler()
    root.allUsersPage=AllUsersPageHandler()
    root.programResultPage=ProgramResultPageHandler()
    root.courseResultPage=CourseResultPageHandler()
    root.program.course=CoursePageHandler()
    cherrypy.quickstart(root,"",config=application_conf)   


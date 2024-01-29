module UserCourseHelper

    def user_belongs_to_course?(user, course)
    # Verificar si el usuario pertenece al curso (course) a través de la asociación user_courses
        user.user_courses.exists?(course: course)
    end

    def course_belongs_to_user?(course, user)
    # Verificar si el curso (course) pertenece al usuario a través de la asociación user_courses
        course.user_courses.exists?(user: user)
    end

end
